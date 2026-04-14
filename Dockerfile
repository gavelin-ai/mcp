FROM node:20-alpine

RUN npm install -g mcp-remote@0.1.38

ENV GAVELIN_API_KEY=""
ENV HOME=/tmp
ENV MCP_REMOTE_CONFIG_DIR=/tmp/.mcp-auth

ENTRYPOINT ["sh", "-c", "exec mcp-remote https://mcp.gavelin.ai/mcp --transport http-only --header \"Authorization: Bearer ${GAVELIN_API_KEY}\""]
