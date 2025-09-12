import { Response } from 'express';
import { initializeApp } from 'firebase-admin/app';
import { logger } from 'firebase-functions';
import { HttpsError, Request } from 'firebase-functions/v2/https';

initializeApp();

import * as TelegramBot from 'node-telegram-bot-api';
import {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
} from '../../core/constants/telegram.constants';
import { validateHttpMethod } from '../../shared/utils/http-method.utils';
import { checkRateLimit } from '../../shared/utils/rate-limiter';
import { ContactFormRequest } from './types/contact-form-request.type';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

/**
 * Handles the contact form submission and forwards it to Telegram.
 */
export default async (req: Request, res: Response) => {
  if (!validateHttpMethod(req, res, ['POST'])) {
    return;
  }

  const data: ContactFormRequest = req.body;

  try {
    validateFormInput(data);
    await checkRateLimit(req, 'contact-form', 7);

    logger.debug('📩 Sending contact form via Telegram');

    const message = buildTelegramMessage(data);
    await bot.sendMessage(TELEGRAM_CHAT_ID, message);

    logger.debug('✅ Contact form sent');
    return res.status(200).json({ success: true });
  } catch (err) {
    logger.error('❌ Failed to handle contact form submission', err);
    const status = err instanceof HttpsError ? 400 : 500;
    return res.status(status).json({ error: 'Failed to submit contact form' });
  }
};

/**
 * Validates the structure of the contact form request.
 * @throws {HttpsError} if validation fails
 */
function validateFormInput({
  givenName,
  familyName,
  email,
  message,
}: ContactFormRequest) {
  if (
    typeof givenName === 'string' &&
    typeof familyName === 'string' &&
    typeof message === 'string' &&
    typeof email === 'string'
  ) {
    return;
  }

  logger.warn('⚠️ Invalid form data received', {
    types: {
      givenName: typeof givenName,
      familyName: typeof familyName,
      message: typeof message,
      email: typeof email,
    },
  });
  throw new HttpsError('invalid-argument', 'Invalid form data');
}

/**
 * Builds a formatted message for Telegram delivery.
 */
function buildTelegramMessage({
  givenName,
  familyName,
  email,
  message,
}: ContactFormRequest): string {
  const safeGivenName = givenName?.trim().truncate(60) ?? '';
  const safeFamilyName = familyName?.trim().truncate(60) ?? '';
  const safeEmail = email?.trim().truncate(256) ?? '';
  const safeMessage = message?.trim().truncate(10_000) ?? '';

  return [
    '📨 New Contact Form Submission:',
    `👤 Given Name: ${safeGivenName}`,
    `👤 Family Name: ${safeFamilyName}`,
    `📧 E-Mail: ${safeEmail}`,
    `📝 Message:\n${safeMessage}`,
  ].join('\n');
}
