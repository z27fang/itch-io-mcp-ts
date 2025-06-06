export const ITCH_IO_API_BASE = "https://itch.io/api/1/";
export const USER_AGENT = "itch-io-mcp-client/1.0";
export const getAllGamesEndpoint = (key: string) =>
  `${ITCH_IO_API_BASE}/${key}/my-games`;

export const HEADER = {
  "User-Agent": USER_AGENT,
  Accept: "application/json",
};
