import { getAllGamesEndpoint, HEADER } from "../consts.js";
import { getApiKeyFromArgs } from "../getApiKey.js";
import { IMyGamesResponse } from "./interface.js";

export const makeAllMyGamesRequest = async (): Promise<IMyGamesResponse> => {
  try {
    const apiKey = getApiKeyFromArgs();

    if (!apiKey) {
      throw new Error("ITCH_IO_API_KEY is not set");
    }

    const response = await fetch(getAllGamesEndpoint(apiKey), {
      headers: HEADER,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }

    const data = (await response.json()) as IMyGamesResponse;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
