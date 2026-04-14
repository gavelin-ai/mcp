#!/usr/bin/env node
// stdio <-> Streamable HTTP proxy for mcp.gavelin.ai.
// Lets local MCP inspectors (e.g. Glama) introspect the hosted server.

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ResultSchema } from "@modelcontextprotocol/sdk/types.js";

const REMOTE_URL = process.env.GAVELIN_MCP_URL || "https://mcp.gavelin.ai/mcp";
const API_KEY = process.env.GAVELIN_API_KEY;

if (!API_KEY) {
  console.error("[gavelin-proxy] GAVELIN_API_KEY is required");
  process.exit(1);
}

const log = (...args) => console.error("[gavelin-proxy]", ...args);

async function main() {
  const upstreamTransport = new StreamableHTTPClientTransport(
    new URL(REMOTE_URL),
    {
      requestInit: {
        headers: { Authorization: `Bearer ${API_KEY}` },
      },
    }
  );

  const upstream = new Client(
    { name: "gavelin-stdio-proxy", version: "1.0.0" },
    { capabilities: {} }
  );

  upstream.onerror = (err) => log("upstream error:", err?.message ?? err);
  upstream.onclose = () => {
    log("upstream closed, exiting");
    process.exit(0);
  };

  await upstream.connect(upstreamTransport);
  log("upstream connected, session:", upstreamTransport.sessionId ?? "(none)");

  const serverCapabilities = upstream.getServerCapabilities() ?? {};
  const serverInfo = upstream.getServerVersion() ?? {
    name: "gavelin-mcp",
    version: "unknown",
  };
  const instructions = upstream.getInstructions();

  const downstream = new Server(
    { name: serverInfo.name, version: serverInfo.version },
    {
      capabilities: serverCapabilities,
      ...(instructions ? { instructions } : {}),
    }
  );

  downstream.onerror = (err) => log("downstream error:", err?.message ?? err);
  downstream.onclose = () => {
    log("downstream (stdio) closed");
    upstream.close().catch(() => {}).finally(() => process.exit(0));
  };

  downstream.fallbackRequestHandler = async (request, extra) => {
    const { jsonrpc, id, ...rpc } = request;
    return await upstream.request(rpc, ResultSchema, {
      signal: extra.signal,
    });
  };

  downstream.fallbackNotificationHandler = async (notification) => {
    const { jsonrpc, ...rpc } = notification;
    try {
      await upstream.notification(rpc);
    } catch (err) {
      log("failed to forward notification", notification.method, err?.message);
    }
  };

  upstream.fallbackRequestHandler = async (request, extra) => {
    const { jsonrpc, id, ...rpc } = request;
    return await downstream.request(rpc, ResultSchema, { signal: extra.signal });
  };

  upstream.fallbackNotificationHandler = async (notification) => {
    const { jsonrpc, ...rpc } = notification;
    try {
      await downstream.notification(rpc);
    } catch (err) {
      log("failed to forward notification", notification.method, err?.message);
    }
  };

  const stdioTransport = new StdioServerTransport();
  await downstream.connect(stdioTransport);
  log("stdio proxy ready");
}

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    log("received", sig, "— shutting down");
    process.exit(0);
  });
}

main().catch((err) => {
  log("fatal:", err?.stack ?? err);
  process.exit(1);
});
