export interface Game {
  id: GameIDs;
  name: string;
  startState: string;
  description: string;
}
type GameIDs = 'color-clash' | 'quantum-quiz';
