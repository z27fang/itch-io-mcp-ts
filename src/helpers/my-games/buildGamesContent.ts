import { IGame } from "./interface.js";

export const buildGamesContent = (games: IGame[]) => {
  return {
    content: games.map((game) => {
      return {
        type: "text",
        text: `${game.title} ${game.earnings?.[0]?.amount_formatted}`,
      };
    }),
  };
};
