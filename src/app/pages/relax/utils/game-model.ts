export interface Game {
  id: GameIDs;
  name: string;
  description: string;
}
type GameIDs = 'color-clash' | 'quantum-quiz';
