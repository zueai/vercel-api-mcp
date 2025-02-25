# vercel-api-mcp

This is a lightweight Model Control Protocol (MCP) server bootstrapped with [create-mcp](https://github.com/zueai/create-mcp), and deployed on Cloudflare Workers.

This MCP server allows AI agents (such as Cursor) to use the functions in [src/index.ts](src/index.ts) as MCP tools to interface with the [Vercel API](https://vercel.com/docs/api).

It's still under development, I will be adding more tools as I find myself needing them.

## Available Tools

See [src/index.ts](src/index.ts) for the current list of tools. Every method in the class is an MCP tool.

## Installation

1. Run the automated install script to clone this MCP server and deploy it to your Cloudflare account:

```bash
bun create mcp --clone https://github.com/zueai/vercel-api-mcp
```

2. Open `Cursor Settings -> MCP -> Add new MCP server` and paste the command that was copied to your clipboard.

3. (Optional) Upload any secrets:

```bash
bunx wrangler secret put VERCEL_API_TOKEN
```

## Deploying Changes

1. Run the deploy script:

```bash
bun run deploy
```

2. Then reload your Cursor window to use the updated tools.

## How to create new MCP tools

To create new MCP tools, add methods to the `MyWorker` class in `src/index.ts`. Each function will automatically become an MCP tool that your agent can use.

Example:

```typescript
/**
 * A warm, friendly greeting from your MCP server.
 * @param name {string} the name of the person we are greeting.
 * @return {string} the contents of our greeting.
 */
sayHello(name: string) {
    return `Hello from an MCP Worker, ${name}!`;
}
```

The JSDoc comments are important:

- First line becomes the tool's description
- `@param` tags define the tool's parameters with types and descriptions
- `@return` tag specifies the return value and type

## Learn More

Check out the following resources to learn more:

- [create-mcp Documentation](https://github.com/zueai/create-mcp) - learn about the create-mcp CLI
- [Model Control Protocol Documentation](https://modelcontextprotocol.io) - learn about the model control protocol
- [workers-mcp](https://github.com/cloudflare/workers-mcp) - the package that implements the MCP protocol for Cloudflare Workers
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) - learn about the Cloudflare Workers platform
- [Vercel API Documentation](https://vercel.com/docs/api) - learn about the Vercel API
