import { defineString } from 'firebase-functions/params';

export const TELEGRAM_BOT_TOKEN = defineString('TELEGRAM_BOT_TOKEN').value();
export const TELEGRAM_CHAT_ID = defineString('TELEGRAM_CHAT_ID').value();
