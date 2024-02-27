import * as express from 'express';
import { defineString } from 'firebase-functions/params';
import * as https from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v2/https';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: defineString('OPEN_AI_KEY').value(),
});

export default async (req: https.Request, resp: express.Response) => {
  if (req.method !== 'POST') {
    throw new HttpsError('permission-denied', 'Permission-denied!');
  }

  const lang = req.path.split('/')[1];
  const topic = (req.body?.['topic'] as string)?.substring(0, 20) ?? 'Random';


  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `
                  Generate a quiz consisting of 15 questions for the user. 
                  Each question should offer four answer options, with one correct answer. 
                  The topic from the quiz should be ${topic}.
                  The language in which you translate the questions and answers is ${lang === 'de' ? 'German' : 'English'}.
                  Start with an easy question and progressively increase the difficulty with each subsequent question.
                  The response should not include any identifiers such as 'a-' or '1'. Only the text content of the answer should be provided.
                  Provide the correct answer index within the array of answers in the response JSON format, structured as follows:
                  {
                    "quiz": [
                      {
                        "question": "Text from question",
                        "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                        "correctAnswer": 2
                      },
                      ... 
                    ]
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
    model: 'gpt-3.5-turbo',
  });

  return resp.status(200).json(completion.choices[0].message.content);
};
