import { Game } from 'src/app/features/relax/interfaces/game.interface';

export const GAMES: ReadonlyArray<Game> = [
  {
    id: 'quantum-quiz',
    name: 'Quantum Quiz',
    startState: 'instruction',
    description: $localize`Can you emerge victorious on the millionaire show with your AI-generated topic?`,
    topics: [$localize`Knowledge`, $localize`Intelligence`],
  },
  {
    id: 'color-clash',
    name: 'Color Clash',
    startState: 'instruction',
    description: $localize`Attempt to keep your mind under control without getting confused.`,
    topics: [$localize`Reaction`, $localize`Focus`],
  },
];
