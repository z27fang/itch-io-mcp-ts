#itch-io-ts-mcp

This is a typescript implementation of Claude's mcp for itch.io endpoints.

https://github.com/user-attachments/assets/b96160da-7515-4f63-a6c8-eed48c71fe68

![059dea8cfe19551f1b8484d89e27509](https://github.com/user-attachments/assets/96ec0ecc-fc3e-4749-b04e-2313f122d27b)

Endpoints included in this mcp:

- `https://itch.io/api/1/KEY/my-games`
- `https://itch.io/api/1/KEY/game/GAME_ID/download_keys`
- `https://itch.io/api/1/KEY/game/GAME_ID/purchases`

To enable this mcp for your claude, you will need to

1. install latest node.js if you haven't
2. install this mcp by `npm install -g itch-io-mcp --force`
3. add following to your `claude_desktop_config.json` (update path if you're using mac or linux):

```
    "mcpServers": {
        "itch-io": {
            "command": "npx",
            "args": ["itch-io-mcp", "--api-key", "YOUR_ITCH_IO_API_KEY_HERE"]
        }
    }
```

4. Re-start and run claude!

If you have any questions, feel free to open a discussion!
