import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { defineString } from 'firebase-functions/params';
import * as https from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v2/https';
import OpenAI from 'openai';
import { ddosCheck } from '../utils/ddos-ip-check';

const openai = new OpenAI({
  apiKey: defineString('OPEN_AI_KEY').value(),
});
initializeApp();

export default async (req: https.Request, resp: express.Response) => {
  function getRandomTopic(): string {
    const randomIndex: number = Math.floor(Math.random() * randomTopics.length);
    return randomTopics[randomIndex];
  }

  if (req.method !== 'POST') {
    throw new HttpsError('permission-denied', 'Permission-denied!');
  } else if (req.body === 'wake-up') {
    return resp.status(200).json('Awake');
  }

  const ddosAttack = await ddosCheck(req, 'quiz', 120);
  if (ddosAttack) return resp.status(403).json('Blacklist');

  const lang = (req.body?.['lang'] as string) ?? 'en';
  let topic = (req.body?.['topic'] as string)?.substring(0, 20);

  if (!topic || topic.length < 3) {
    topic = getRandomTopic();
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `
                  Generate a quiz consisting of 15 questions for the user about the topic "${topic}". 
                  Each question should offer four answer options, with one correct answer. 
                  The language in which you translate the questions and answers is ${lang === 'de' ? 'German' : lang === 'vi' ? 'Vietnamese' : 'English'}.
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

const randomTopics = [
  'History',
  'Science',
  'Geography',
  'Literature',
  'Mathematics',
  'Art',
  'Music',
  'Sports',
  'Movies',
  'Technology',
  'Animals',
  'Famous Quotes',
  'Languages',
  'Food',
  'Mythology',
  'Fashion',
  'Space Exploration',
  'Politics',
  'Celebrities',
  'World Records',
  'Cultural Traditions',
  'Inventions',
  'Architecture',
  'Current Events',
  'Literary Characters',
  'Natural Disasters',
  'Health and Wellness',
  'Cartoons and Animation',
  'Environmental Issues',
  'Economics',
  'Psychology',
  'Famous Battles',
  'Business',
  'Literary Genres',
  'Olympic Games',
  'Pop Culture',
  'Astronomy',
  'Human Anatomy',
  'Technology Innovations',
  'Social Media',
  'Transportation',
  'Ancient Civilizations',
  'Fashion Designers',
  'Botany',
  'Film Directors',
  'Computer Science',
  'Cuisine',
  'World Leaders',
  'Literary Movements',
  'Endangered Species',
  'Art Movements',
  'Music Genres',
  'Explorers',
  'Sustainable Living',
  'Philosophy',
  'Famous Trials',
  'Internet Culture',
  'Travel Destinations',
  'Cryptocurrency',
  'Human Rights Issues',
  'Space Travel',
  'Educational Theories',
  'Human Evolution',
  'Political Movements',
  'Influential Figures',
  'Climate Change',
  'Modern Art',
  'Sports Legends',
  'Wildlife Conservation',
  'Culinary Traditions',
  'Artists',
  'Literary Devices',
  'Film Awards',
  'Biographies',
  'Social Issues',
  'Literary Themes',
  'Music Awards',
  'Sporting Events',
  'Famous Trials',
  'Humanitarian Efforts',
  'Cultural Celebrations',
  'Famous Speeches',
  'Literary Criticism',
  'Film Genres',
  'Eco-friendly Initiatives',
  'Globalization',
  'Famous Achievements',
  'Influential Books',
  'Artifacts',
  'Literary Periods',
  'Film Stars',
  'Economic Trends',
  'Social Justice Movements',
  'Medical Ethics',
  'Space Discoveries',
  'Educational Reforms',
  'Environmental Activism',
  'Humanitarian Organizations',
  'Cultural Movements',
  'Fashion Trends',
  'Musical Instruments',
  'Sports Rules',
  'Political Leaders',
  'Literary Adaptations',
  'Film Soundtracks',
  'Art Exhibitions',
  'Ancient Texts',
  'Film Festivals',
  'Fashion Icons',
  'Musical Legends',
  'Sporting Achievements',
  'Political Ideologies',
  'Literary Eras',
  'Film Studios',
  'Art Styles',
  'Musical Composers',
  'Sporting Venues',
  'Cultural Landmarks',
  'Scientific Discoveries',
  'Literary Figures',
  'Film Trivia',
  'Art History',
  'Musical Genres',
  'Sports Equipment',
  'Film Directors',
  'Artistic Movements',
  'Music Bands',
  'Sports Teams',
  'Political Campaigns',
  'Film Production',
  'Art Collections',
  'Music Festivals',
  'Sports Strategies',
  'Political Scandals',
  'Film Sets',
  'Art Restoration',
  'Music Videos',
  'Sportsmanship',
  'Political Reforms',
  'Literary Archetypes',
  'Film Merchandise',
  'Art Galleries',
  'Music Labels',
  'Sports Psychology',
  'Political Commentators',
  'Literary Festivals',
  'Film Posters',
  'Art Installations',
  'Music Streaming',
  'Sports Nutrition',
  'Political Activism',
  'Literary Manuscripts',
  'Film Screenplays',
  'Art Dealers',
  'Music Charts',
  'Sports Medicine',
  'Political Satire',
  'Literary Prizes',
  'Film Scripts',
  'Art Markets',
  'Music Lyrics',
  'Sports Science',
  'Political Movements',
  'Literary Translations',
  'Film Criticism',
  'Art Museums',
  'Music Production',
  'Sports Analytics',
  'Political History',
  'Literary Critiques',
  'Film Editing',
  'Art Fairs',
  'Music Trends',
  'Sports Management',
  'Political Economy',
  'Literary Interpretations',
  'Film Festivals',
  'Art Auctions',
  'Music Composition',
  'Sports Marketing',
  'Political Philosophy',
  'Literary Adaptations',
  'Film Distribution',
  'Art Restoration',
  'Music Festivals',
  'Sports Broadcasting',
  'Political Geography',
  'Literary Journals',
  'Film Music',
  'Art Conservation',
  'Music Festivals',
  'Sports Analytics',
  'Political History',
  'Literary Critiques',
  'Film Editing',
  'Art Fairs',
  'Music Trends',
  'Sports Management',
  'Political Economy',
  'Literary Interpretations',
  'Film Festivals',
  'Art Auctions',
  'Music Composition',
  'Sports Marketing',
  'Political Philosophy',
  'Literary Adaptations',
  'Film Distribution',
  'Art Restoration',
  'Music Festivals',
  'Sports Broadcasting',
  'Political Geography',
  'Literary Journals',
  'Film Music',
  'Art Conservation',
];
