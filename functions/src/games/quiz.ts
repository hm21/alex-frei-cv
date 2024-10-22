import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { info } from 'firebase-functions/logger';
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
    const randomIndex: number = Math.randomNextInt(randomTopics.length);
    return randomTopics[randomIndex];
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
    info('Generate quiz', { topic, lang });
  }

  // Create the completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
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
  });

  return resp.status(200).json({
    topic,
    topicTranslated,
    generated: completion.choices[0].message.content,
  });
};

const randomTopics = [
  'World History',
  'Ancient Civilizations',
  'Famous Explorers',
  'Geography of Europe',
  'African Wildlife',
  'Human Anatomy',
  'Famous Inventions',
  'Space Exploration',
  'Greek Mythology',
  'The Solar System',
  'Modern Art Movements',
  'Renaissance Art',
  'Famous Battles in History',
  'World War I',
  'World War II',
  'Political Systems',
  'Physics Fundamentals',
  'Chemistry Elements',
  'Nobel Prize Winners',
  'Famous Authors',
  'Shakespeare Plays',
  'Science Fiction Literature',
  'French Revolution',
  'World Capitals',
  'Mountain Ranges',
  'Deserts of the World',
  'Marine Biology',
  'Human Psychology',
  'Mathematical Theorems',
  'World Religions',
  'Philosophy of Ethics',
  'Famous Philosophers',
  'Dinosaurs',
  'Evolutionary Biology',
  'World Economy',
  'Famous Scientists',
  'Musical Instruments',
  'Classical Music Composers',
  'Pop Culture Icons',
  'Famous Films',
  'Oscar-Winning Movies',
  'Jazz History',
  'Global Climate Change',
  'Renewable Energy',
  'Medical Discoveries',
  'World War II Leaders',
  'Medieval Europe',
  'World Empires',
  'Historical Monuments',
  'Ancient Greece',
  'Ancient Egypt',
  'Roman Empire',
  'Cultural Festivals',
  'Olympic Games History',
  'Computer Science Basics',
  'Programming Languages',
  'Cybersecurity',
  'Social Media Platforms',
  'Artificial Intelligence',
  'Robotics',
  'Spacecraft and Satellites',
  'Astronomy Constellations',
  'Physics of Sound',
  'Quantum Mechanics',
  'Thermodynamics',
  'Famous Mathematicians',
  'World Geography',
  'South American Countries',
  'North American Landmarks',
  'Asian Countries and Capitals',
  'Middle Eastern Conflicts',
  'Global Human Rights',
  'International Organizations',
  'UN Sustainable Goals',
  'Famous Architects',
  'Art History Movements',
  'Cultural Anthropology',
  'Sociology Theories',
  'Psychological Disorders',
  'Cognitive Behavioral Therapy',
  'Plant Biology',
  'Marine Ecosystems',
  'Endangered Species',
  'Oceanography',
  'Meteorology',
  'Volcanoes and Earthquakes',
  'Plate Tectonics',
  'Rivers and Lakes',
  'Deserts and Oases',
  'Bird Species',
  'Insects of the World',
  'Human Skeleton',
  'Brain and Nervous System',
  'Genetics',
  'Famous Political Leaders',
  'Colonialism',
  'Human Rights Activists',
  'Global Environmental Issues',
  'History of Space Travel',
  'Famous Castles',
  'Space Telescopes',
  'History of the Internet',
  'World Architecture',
  'Famous Discoveries in Science',
  'Sharks and Marine Predators',
  'The Renaissance Period',
  'Medieval Architecture',
  'Ancient Roman Engineering',
  'Geography of South America',
  'Countries of the Middle East',
  'Nuclear Physics',
  'The Periodic Table',
  'Organic Chemistry',
  'Botanical Gardens',
  'Human Evolution',
  'Fossils and Paleontology',
  'Artificial Satellites',
  'Space Missions to Mars',
  'History of Space Stations',
  'Physics of Black Holes',
  'Genetic Engineering',
  'Artificial Intelligence Ethics',
  'Cryptocurrencies',
  'Blockchain Technology',
  'Famous Video Games',
  'Computer Programming',
  'Mobile Application Development',
  'Cloud Computing',
  'History of Operating Systems',
  'History of the Cold War',
  'The Vietnam War',
  'The Gulf War',
  'Famous Speeches in History',
  'History of Democracy',
  'International Space Station',
  'Famous Kings and Queens',
  'Presidents of the United States',
  'Prime Ministers of the UK',
  'Famous Historical Treaties',
  'Economic Theories',
  'Stock Market Crashes',
  'Cryptography',
  'Cybercrime',
  'Internet Safety',
  'History of Robotics',
  '3D Printing',
  'Augmented Reality',
  'Virtual Reality',
  'Evolution of the Smartphone',
  'Electric Cars',
  'Famous Bridges',
  'Skyscrapers Around the World',
  'World Wonders',
  'Historical Inventions',
  'The Industrial Revolution',
  'The Information Age',
  'The Space Age',
  'Molecular Biology',
  'DNA and Genes',
  'Biotechnology',
  'Famous Chemists',
  'World Rivers',
  'Lakes and Reservoirs',
  'World Mountain Peaks',
  'Geology',
  'History of Medicine',
  'Famous Diseases and Epidemics',
  'Vaccinations',
  'Space Agencies Around the World',
  'Astronomy Discoveries',
  'Exoplanets',
  'History of the Moon Landing',
  'History of Astronomy',
  'Famous Museums',
  'Art Collectors',
  'Gothic Architecture',
  'Post-Impressionism',
  'Baroque Art',
  'Modern Architecture',
  'Famous Explorers of the Seas',
  'Natural Disasters',
  'Environmental Activism',
  'World Languages',
  'Biodiversity',
  'Human Impact on the Environment',
  'Climate Change Policies',
  'Sustainable Development',
  'Energy Conservation',
  'Famous Spacecrafts',
  'History of Aviation',
  'World War I Leaders',
  'Medieval Kings',
  'Famous Female Scientists',
  "History of Women's Rights",
  'Political Ideologies',
  'Socialism vs Capitalism',
  'World War II Battles',
  'History of Television',
  'The Film Industry',
  'History of Comic Books',
  'Famous Book Awards',
  'Hollywood Studios',
  'History of Photography',
  'Cinematography Techniques',
];
