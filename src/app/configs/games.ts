import { Game } from '../pages/relax/utils/game-model';

export const GAMES: Game[] = [
  {
    id: 'quantum-quiz',
    name: 'Quantum Quiz',
    startState: 'instruction',
    description: $localize`Can you emerge victorious on the millionaire show with your AI-generated topic?`,
  },
  {
    id: 'color-clash',
    name: 'Color Clash',
    startState: 'instruction',
    description: $localize`Attempt to keep your mind under control without getting confused.`,
  },
];
