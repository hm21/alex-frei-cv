import { GameId } from "../types/game.types";

export interface Game {
  id: GameId;
  name: string;
  startState: string;
  description: string;
}
