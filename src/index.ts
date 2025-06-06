#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { makeAllMyGamesRequest } from "./helpers/my-games/makeAllMyGamesRequest.js";
import { makeDownloadKeyCheckRequest } from "./helpers/download-key-checks/makeDownloadKeyCheckRequest.js";
import {
  IDownloadKeyCheckError,
  IDownloadKeyCheckResponse,
} from "./helpers/download-key-checks/interface.js";
import { z } from "zod";
import { makeGamePurchasesRequest } from "./helpers/game-purchases/makeGamePurchasesRequest.js";

const server = new McpServer({
  name: "itch-io-ts",
  version: "0.0.1",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool("get-my-games", "Get all games on itch.io", {}, async () => {
  const gamesData = await makeAllMyGamesRequest();
  if (gamesData.games.length === 0) {
    return {
      content: [{ type: "text", text: "No games found." }],
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `Found ${
          gamesData.games.length
        } games. with raw content: ${JSON.stringify(gamesData)}`,
      },
    ],
  };
});

server.tool(
  "check-download-key",
  "Check if a download key is valid",
  {
    downloadKey: z
      .string()
      .optional()
      .describe(
        "The download key for your game, this is an optional parameter."
      ),
    userId: z
      .string()
      .optional()
      .describe(
        "Passing user_id instead is useful in scenarios where you have authenticated a user via an app manifest. That makes it impossible for users to spoof their user_id."
      ),
    email: z
      .string()
      .optional()
      .describe(
        "When passing email, you are responsible for verifying the user's email address first, otherwise they could attempt to guess an email they don't own in order to fake ownership."
      ),
    gameId: z
      .string()
      .describe("The game ID to check. This is a necessary parameter."),
  },
  async (args) => {
    const downloadKeyData = await makeDownloadKeyCheckRequest({
      gameId: args.gameId,
      downloadKey: args.downloadKey,
      userId: args.userId,
      email: args.email,
    });

    if (downloadKeyData.errors) {
      const downloadKeyError = downloadKeyData as IDownloadKeyCheckError;
      return {
        content: [
          {
            type: "text",
            text: `Errors: ${downloadKeyError?.errors?.join(", ")}`,
          },
        ],
      };
    }

    const downloadKeyResponse = downloadKeyData as IDownloadKeyCheckResponse;

    return {
      content: [
        {
          type: "text",
          text: `
          For this key, you have ${
            downloadKeyResponse.download_key?.downloads
          } downloads.
          The key's owner is ${
            downloadKeyResponse.download_key?.owner?.display_name
          }.
          For more information, here's the raw data: ${JSON.stringify(
            downloadKeyResponse
          )}
          `,
        },
      ],
    };
  }
);

server.tool(
  "get-game-purchases",
  "Get all purchases for a game by providing an meail address or a user id.",
  {
    gameId: z.string().describe("The game ID to get purchases for."),
    userId: z.string().optional().describe("The user ID to get purchases for."),
    email: z
      .string()
      .optional()
      .describe("The email address to get purchases for."),
  },
  async (args) => {
    const gamePurchases = await makeGamePurchasesRequest({
      gameId: args.gameId,
      userId: args.userId,
      email: args.email,
    });

    return {
      content: [
        {
          type: "text",
          text: `Found ${
            gamePurchases.purchases?.length
          } purchases. with raw content: ${JSON.stringify(gamePurchases)}`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.info("itch.io MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
