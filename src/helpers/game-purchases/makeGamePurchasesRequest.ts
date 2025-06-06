import { HEADER } from "../consts.js";
import { getGamePurchasesEndpoint } from "./getGamePurchasesEndpoint.js";

export interface IGamePurchasesRequest {
  gameId?: string;
  userId?: string;
  email?: string;
}

export const makeGamePurchasesRequest = async ({
  gameId,
  userId,
  email,
}: IGamePurchasesRequest) => {
  try {
    if (!gameId) {
      throw new Error("Game ID is required.");
    }

    const response = await fetch(
      getGamePurchasesEndpoint({
        userId,
        email,
        gameId,
      }),
      {
        headers: HEADER,
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch download key check: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
