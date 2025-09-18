import { Response } from 'express';
import { initializeApp } from 'firebase-admin/app';
import { logger } from 'firebase-functions';
import { defineString } from 'firebase-functions/params';
import * as https from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v2/https';

initializeApp();

import * as TelegramBot from 'node-telegram-bot-api';
import OpenAI from 'openai';
import {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
} from '../../core/constants/telegram.constants';
import { validateHttpMethod } from '../../shared/utils/http-method.utils';
import { checkRateLimit } from '../../shared/utils/rate-limiter';
import { RANDOM_QUIZ_TOPICS } from './constants/random-quiz-topics.constant';

const openai = new OpenAI({ apiKey: defineString('OPEN_AI_KEY').value() });
const telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

export default async (req: https.Request, resp: Response) => {
  if (!validateHttpMethod(req, resp, ['POST'])) {
    return;
  }

  if (req.body === 'wake-up') {
    return resp.status(200).json('Awake');
  }

  await checkRateLimit(req, 'quiz', 120);

  const lang = (req.body?.lang as string) ?? 'en';
  const topicInput = (req.body?.topic as string)?.truncate(20);

  logger.debug('📥 Received quiz request', {
    lang,
    topicInput,
  });

  const targetLanguage = getLanguageName(lang);

  let topic = topicInput;
  let topicTranslated = topic;

  // Generate random topic if none or too short
  if (!topic || topic.length < 3) {
    topic = getRandomTopic();
    logger.debug(`🎲 Selected random topic: ${topic}`);
    topicTranslated = await translateTopic(topic, targetLanguage);
    logger.debug(
      `🌐 Translated topic to ${targetLanguage}: ${topicTranslated}`,
    );
  }

  logger.debug('🆕 Generating first quiz question', { topic, lang });
  await sendQuizStartNotification(topic);

  const existingQuestions: string[] = [];
  while (existingQuestions.length < 15 && !resp.closed) {
    const prompt = buildQuizPrompt({
      topic: topicTranslated,
      existingQuestions,
      language: targetLanguage,
    });

    const generatedQuestion = await generateQuizCompletion(prompt);

    const responseMessage: Record<string, string> = {
      value: generatedQuestion,
    };

    if (existingQuestions.length === 0) {
      responseMessage.topic = topicTranslated;
    }

    resp.write(JSON.stringify(responseMessage));
    existingQuestions.push(generatedQuestion);
  }

  return resp.end();
};

/**
 * Returns a random topic from the predefined list.
 */
function getRandomTopic(): string {
  const index = Math.randomNextInt(RANDOM_QUIZ_TOPICS.length);
  return RANDOM_QUIZ_TOPICS[index];
}

/**
 * Returns the proper display name for a language code.
 */
function getLanguageName(code: string): string {
  switch (code) {
    case 'de':
      return 'German';
    case 'vi':
      return 'Vietnamese';
    default:
      return 'English';
  }
}
/**
 * Translates the topic into the target language using OpenAI.
 */
async function translateTopic(
  topic: string,
  language: string,
): Promise<string> {
  if (language === 'English') return topic;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `Translate "${topic}" into "${language}". Only return the translated text.`,
      },
    ],
  });

  return completion.choices[0].message.content ?? topic;
}

/**
 * Builds a structured prompt for the OpenAI quiz generation.
 */
function buildQuizPrompt({
  topic,
  existingQuestions,
  language,
}: {
  topic: string;
  existingQuestions: string[];
  language: string;
}): string {
  return `
    Generate one quiz question about the topic "${topic}". 
    ${existingQuestions.length > 0 ? 'The existing quiz questions are:\n' + existingQuestions.toNumberedList() + '\nMake the new question harder and unique.' : ''}
    Each question must have four answer options, with one correct answer.
    Translate the question and answers into ${language}.
    Exclude identifiers like "1.", "a)", etc. Only use plain text.
    Provide the response in this exact JSON format:
    {
      "question": "Text from question",
      "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      "correctAnswer": 0
    }
    If quiz generation fails, respond with a JSON:
    {
      "error": "Reason for the error"
    }
    Make the message clear and helpful in ${language}.
    `;
}
/**
 * Sends a prompt to OpenAI to generate a quiz question.
 *
 * @param prompt - The prompt string for OpenAI
 * @returns The content of the response message
 * @throws HttpsError if OpenAI call fails
 */
async function generateQuizCompletion(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0].message.content ?? '';
  } catch (err) {
    logger.error('❌ Failed to create quiz with OpenAI', err);
    throw new HttpsError('internal', 'Failed to create the quiz');
  }
}
/**
 * Sends a Telegram message indicating that quiz generation has started.
 *
 * @param topicName - The name of the quiz topic
 */
async function sendQuizStartNotification(topicName: string) {
  const message = `🚀 Quiz generation started\n📚 Topic: ${topicName}`;

  try {
    await telegramBot.sendMessage(TELEGRAM_CHAT_ID, message);
    logger.debug('✅ Quiz generation start message sent to Telegram');
  } catch (error) {
    logger.error(
      '❌ Failed to send Telegram notification for quiz start',
      error,
    );
  }
}
