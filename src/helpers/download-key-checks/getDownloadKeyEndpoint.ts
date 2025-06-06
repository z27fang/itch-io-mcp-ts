import { ITCH_IO_API_BASE } from "../consts.js";
import { getApiKeyFromArgs } from "../getApiKey.js";

export const getDownloadKeyCheckEndpoint = ({
  key,
  userId,
  email,
  gameId,
}: {
  key?: string;
  userId?: string;
  email?: string;
  gameId: string;
}) => {
  const apiKey = getApiKeyFromArgs();
  const baseRoute = new URL(
    `${ITCH_IO_API_BASE}/${apiKey}/game/${gameId}/download_keys`
  );

  if (userId) {
    baseRoute.searchParams.set("user_id", userId);
  }

  if (email) {
    baseRoute.searchParams.set("email", email);
  }
  if (key) {
    baseRoute.searchParams.set("download_key", key);
  }

  return baseRoute.toString();
};
