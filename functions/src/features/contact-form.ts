import { error, warn } from 'console';
import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { debug } from 'firebase-functions/logger';
import { defineString } from 'firebase-functions/params';
import { Request } from 'firebase-functions/v2/https';
import * as TelegramBot from 'node-telegram-bot-api';
import { ddosCheck } from '../shared/utils/ddos-ip-check';

initializeApp();

export default async (req: Request, resp: express.Response) => {
  const { givenName, familyName, email, message } = req.body as RequestData;

  // Validate the request body data
  if (
    typeof givenName !== 'string' ||
    typeof familyName !== 'string' ||
    typeof message !== 'string' ||
    typeof email !== 'string'
  ) {
    warn('⚠️ Invalid form data', {
      types: {
        givenName: typeof givenName,
        familyName: typeof familyName,
        message: typeof message,
        email: typeof email,
      },
    });
    return resp.status(400).json('Invalid form data');
  }

  // Check for potential DDOS attack
  const ddosAttack = await ddosCheck(req, 'contact-form', 7);
  if (ddosAttack) return resp.status(403).json('Blacklist');

  debug('⏳ Send contact form');

  // Format the message to be sent to Telegram
  const telegramMsg = `Given Name: ${givenName?.trim().truncate(60)}\n
Family Name: ${familyName?.trim().truncate(60)}\n
E-Mail: ${email?.trim().truncate(256)}\n
Message: ${message?.trim().truncate(10_000)}`;

  // Initialize the Telegram bot
  const bot: TelegramBot = new TelegramBot(
    defineString('TELEGRAM_BOT_TOKEN').value(),
    { polling: false },
  );

  // Send the message to the specified Telegram chat ID
  return bot
    .sendMessage(defineString('TELEGRAM_CHAT_ID').value(), telegramMsg)
    .then(() => {
      debug('✅ Contact message sent successfully');
      return resp.status(200).json('Success');
    })
    .catch((err) => {
      error('❌ Failed to send contact message', err);
      return resp.status(500).json('Send message error');
    });
};

interface RequestData {
  givenName: string;
  familyName: string;
  email: string;
  message: string;
}
