import { QuizItem } from './quantum-quiz-item.type';

export type QuizResponse = {
  topic?: string;
  value: string;
  quiz?: QuizItem;
};
