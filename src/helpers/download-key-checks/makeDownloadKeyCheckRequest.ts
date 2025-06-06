import { HEADER } from "../consts.js";
import { getApiKeyFromArgs } from "../getApiKey.js";
import { getDownloadKeyCheckEndpoint } from "./getDownloadKeyEndpoint.js";

export interface IDownloadKeyCheckRequest {
  downloadKey?: string;
  userId?: string;
  email?: string;
  gameId: string;
}

export const makeDownloadKeyCheckRequest = async ({
  downloadKey,
  userId,
  email,
  gameId,
}: IDownloadKeyCheckRequest) => {
  try {
    const apiKey = getApiKeyFromArgs();
    if (!apiKey) {
      throw new Error("ITCH_IO_API_KEY is not set");
    }
    if (!gameId) {
      throw new Error("Game ID is required.");
    }

    const response = await fetch(
      getDownloadKeyCheckEndpoint({
        key: downloadKey,
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
