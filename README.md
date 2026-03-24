# Gavelin MCP Server

**State legislative intelligence for AI agents.** The only MCP server with speaker-attributed hearing transcripts from US state legislatures.

Search bills across all 50 states, find what legislators said in hearings, get full committee hearing transcripts with speaker attribution — all via the Model Context Protocol.

## Connect

**Server URL:** `https://mcp.gavelin.ai/mcp`

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gavelin": {
      "url": "https://mcp.gavelin.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Claude Code

```json
{
  "mcpServers": {
    "gavelin": {
      "type": "url",
      "url": "https://mcp.gavelin.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Any MCP Client

The server uses Streamable HTTP transport. Any MCP-compatible client (Cursor, Windsurf, custom agents) can connect with the URL and a bearer token.

## Get an API Key

Sign up at [gavelin.ai](https://gavelin.ai) and generate an API key from your Account page under "Developer API."

## Available Tools

### `search_bills`
Search bills across all 50 US states + DC by keyword, sponsor, committee, status, or chamber. Covers multiple legislative sessions with full detail including sponsors, subjects, and legislative history.

**Example queries an agent might make:**
- "What housing bills are pending in California?"
- "Find bills sponsored by Rivera in New York"
- "Search for cannabis legislation that passed in 2025"

### `search_hearing_testimony`
Search speaker-attributed hearing and floor session segments. Find what specific legislators or witnesses said about any topic. Returns speaker name, role, committee, date, and surrounding context.

**Example queries:**
- "What has Senator Krueger said about affordable housing?"
- "Find testimony about SNAP benefits in Finance committee hearings"

### `get_bill_detail`
Get full details on a specific bill including sponsor, subjects, committee, legislative history, and any hearing mentions.

### `get_speaker_activity`
Get everything a specific legislator or witness has said in hearings and floor sessions. Useful for opposition research, coalition mapping, and pre-meeting preparation.

### `search_committee_hearings`
Browse committee and public hearings by topic, committee, chamber, or date range.

### `get_hearing_transcript`
Get the full transcript of a specific hearing with all speakers labeled by name.

### `list_available_states`
See which states have data and what type (bills, transcripts, or both).

## Rate Limits

| Plan | Limit |
|------|-------|
| Starter | 100 calls/hour |
| Professional | 500 calls/hour |
| Enterprise | Custom |

## What Makes This Different

Every government affairs team will have AI agents doing policy research. Those agents need clean, structured legislative data. Gavelin is the access layer.

- **Speaker attribution** — real names on hearing testimony, not "Speaker A/B"
- **All 50 states** — not just federal, not just one state
- **Historical depth** — multiple years of legislative sessions
- **Authenticated + rate-limited** — production-ready for team workflows

No other MCP server has speaker-attributed state legislative hearing transcripts.

## About

Gavelin is an AI-powered legislative intelligence platform.

- **Web app:** [gavelin.ai](https://gavelin.ai)
- **Contact:** hello@gavelin.ai
- **Pricing:** [gavelin.ai](https://gavelin.ai) — Starter, Professional, and Enterprise plans

## License

This repository contains documentation only. The Gavelin MCP server is a proprietary hosted service.
