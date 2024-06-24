import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { defineString } from 'firebase-functions/params';
import * as https from 'firebase-functions/v2/https';
import * as TelegramBot from 'node-telegram-bot-api';
import { ddosCheck } from './utils/ddos-ip-check';

initializeApp();

export default async (req: https.Request, resp: express.Response) => {
  const d: {
    firstname: string;
    lastname: string;
    email: string;
    msg: string;
  } = req.body;

  // Validate the request body data
  if (
    typeof d.firstname !== 'string' ||
    typeof d.lastname !== 'string' ||
    typeof d.msg !== 'string' ||
    typeof d.email !== 'string'
  ) {
    return resp.status(400).json('Invalid form data');
  }

  // Check for potential DDOS attack
  const ddosAttack = await ddosCheck(req, 'contact-form', 7);
  if (ddosAttack) return resp.status(403).json('Blacklist');

  // Format the message to be sent to Telegram
  const msg = `Firstname: ${d.firstname?.trim().truncate(60)}\n
  Lastname: ${d.lastname?.trim().truncate(60)}\n
  E-Mail: ${d.email?.trim().truncate(256)}\n
  Nachricht: ${d.msg?.trim().truncate(10_000)}`;

  // Initialize the Telegram bot
  const bot: TelegramBot = new TelegramBot(
    defineString('TELEGRAM_BOT_TOKEN').value(),
    { polling: false },
  );

  // Send the message to the specified Telegram chat ID
  return bot
    .sendMessage(defineString('TELEGRAM_CHAT_ID').value(), msg)
    .then(() => {
      return resp.status(200).json('Success');
    })
    .catch(() => {
      return resp.status(500).json('Send message error');
    });
};
