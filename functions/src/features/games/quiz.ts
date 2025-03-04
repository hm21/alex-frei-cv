import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { debug, error } from 'firebase-functions/logger';
import { defineString } from 'firebase-functions/params';
import * as https from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v2/https';
import OpenAI from 'openai';
import { ddosCheck } from '../../shared/utils/ddos-ip-check';
import { RANDOM_QUIZ_TOPICS } from './constants/random-quiz-topics.constant';

const openai = new OpenAI({
  apiKey: defineString('OPEN_AI_KEY').value(),
});
initializeApp();

export default async (req: https.Request, resp: express.Response) => {
  function getRandomTopic(): string {
    const randomIndex: number = Math.randomNextInt(RANDOM_QUIZ_TOPICS.length);
    return RANDOM_QUIZ_TOPICS[randomIndex];
  }

  // Check if the request method is POST
  if (req.method !== 'POST') {
    throw new HttpsError('permission-denied', 'Permission-denied!');
  } else if (req.body === 'wake-up') {
    return resp.status(200).json('Awake');
  }

  // Check for potential DDOS attack
  const ddosAttack = await ddosCheck(req, 'quiz', 120);
  if (ddosAttack) return resp.status(403).json('Blacklist');

  // Extract language and existing questions from the request body
  const lang = (req.body?.['lang'] as string) ?? 'en';
  const existingQuestions = (req.body?.['questions'] as string[]) ?? [];

  // Convert existing questions to a numbered list for the prompt
  const questionsText = existingQuestions.toNumberedList();

  // Determine the target language based on the request body
  const targetLanguage =
    lang === 'de' ? 'German' : lang === 'vi' ? 'Vietnamese' : 'English';

  // The translated name from the topic. This is just important for random topics.
  let topicTranslated: string | undefined;

  // Get the topic name from the body, or create a random topic if not provided or too short
  let topic = (req.body?.['topic'] as string)?.truncate(20);
  if (!topic || topic.length < 3) {
    topic = getRandomTopic();

    if (targetLanguage !== 'English') {
      const topicCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Translate "${topic}" into the language "${targetLanguage}".
                      Just return the translated text, nothing else.`,
          },
        ],
        model: 'gpt-4o-mini',
      });

      topicTranslated = topicCompletion.choices[0].message.content ?? topic;
    } else {
      topicTranslated = topic;
    }
  }

  // Log that a user has started to create a new quiz.
  if (existingQuestions.length === 0) {
    debug('⏳ Generate quiz', { topic, lang });
  }

  // Create the completion request to the OpenAI API
  const completion = await openai.chat.completions
    .create({
      messages: [
        {
          role: 'user',
          content: `
                  Generate one quiz question about the topic "${topic}". 
                  ${existingQuestions.length > 0 ? 'The existing quiz questions are: ' + questionsText + ' The new question must be unique to the existing question.' : ''}
                  Each question should offer four answer options, with one correct answer. 
                  The language in which you translate the questions and answers is ${targetLanguage}.
                  This question should be harder then the existing one which progressively increase the difficulty with each subsequent question.
                  The response should not include any identifiers such as 'a-' or '1'. Only the text content of the answer should be provided.
                  Provide the correct answer index within the array of answers in the response JSON format, structured as follows:
                  {
                    "question": "Text from question",
                    "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    "correctAnswer": 0
                  }
                  If unable to generate a quiz, return a JSON file indicating the reason for the error in the specified language. 
                  The JSON structure for the error message should follow the format below:
                  {
                    "error": "Reason for the error"
                  }
                  Ensure that the error message provides clear and concise information about why it was not possible to create the quiz.
                  `,
        },
      ],
      model: 'gpt-4o-mini',
    })
    .catch((err) => {
      error('❌ Failed to create the quiz', err);
      throw new HttpsError('internal', 'Failed to create the quiz');
    });

  debug('✅ Successfully created the quiz');

  return resp.status(200).json({
    topic,
    topicTranslated,
    generated: completion.choices[0].message.content,
  });
};
