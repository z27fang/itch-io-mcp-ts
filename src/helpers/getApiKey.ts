export function getApiKeyFromArgs() {
  const args = process.argv.slice(2);
  const apiKeyIndex = args.indexOf("--api-key");
  if (apiKeyIndex !== -1 && args[apiKeyIndex + 1]) {
    return args[apiKeyIndex + 1];
  }

  return null;
}
