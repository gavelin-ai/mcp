# Gavelin MCP Server

**State legislative records for AI tools.** Speaker-attributed hearing transcripts from US state legislatures, alongside bill records from all 50 states.

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

Sign up for a free account at [gavelin.ai](https://gavelin.ai) and generate an API key from your Account page under "Developer API."

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
Get everything a specific legislator or witness has said in hearings and floor sessions.

### `search_committee_hearings`
Browse committee and public hearings by topic, committee, chamber, or date range.

### `get_hearing_transcript`
Get the full transcript of a specific hearing with all speakers labeled by name.

### `list_available_states`
See which states have data and what type (bills, transcripts, or both).

## Rate Limits

API keys are free and rate-limited. Email hello@gavelin.ai if you need higher limits.

## What's in it

- **Speaker attribution** — real names on hearing testimony, not "Speaker A/B"
- **All 50 states** — bill records for every state, with hearing transcripts for a growing number of states
- **Historical depth** — multiple years of legislative sessions

## About

Gavelin is a searchable archive of state legislative proceedings. Search is free at [gavelin.ai](https://gavelin.ai).

- **Web app:** [gavelin.ai](https://gavelin.ai)
- **Contact:** hello@gavelin.ai

## License

The MIT License in this repository applies **only to the documentation contained here** (README, server configuration files, logos). The Gavelin MCP server itself is a proprietary hosted service operated by Gavelin ([gavelin.ai](https://gavelin.ai)) and is not covered by the MIT License. Access to the server requires an API key issued under Gavelin's terms of service.
