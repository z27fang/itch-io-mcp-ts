import { ITCH_IO_API_BASE } from "../consts.js";
import { getApiKeyFromArgs } from "../getApiKey.js";

export const getGamePurchasesEndpoint = ({
  gameId,
  userId,
  email,
}: {
  gameId?: string;
  userId?: string;
  email?: string;
}) => {
  const apiKey = getApiKeyFromArgs();
  const baseRoute = new URL(
    `${ITCH_IO_API_BASE}/${apiKey}/game/${gameId}/purchases`
  );

  if (userId) {
    baseRoute.searchParams.set("user_id", userId);
  }

  if (email) {
    baseRoute.searchParams.set("email", email);
  }

  return baseRoute.toString();
};
