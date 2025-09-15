import { FastMCP } from "fastmcp";
import { z } from "zod";
import { GoogleCalendarService } from "./services/google-calendar.js";
import { NotionService } from "./services/notion.js";
import { GitHubService } from "./services/github.js";

const server = new FastMCP({
  name: "Developer Assistant MCP",
  version: "0.1.0",
});

// Initialize services (Developer A's work)
const calendar = new GoogleCalendarService(
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY!,
);
const notion = new NotionService(process.env.NOTION_TOKEN!);
const github = new GitHubService(process.env.GITHUB_TOKEN!);

// Tool definitions (Developer B's work)
server.addTool({
  name: "get_calendar_events",
  description: "Get upcoming calendar events",
  parameters: z.object({
    maxResults: z.number().default(10),
  }),
  execute: async ({ maxResults }) => {
    const events = await calendar.getEvents(maxResults);
    return JSON.stringify(events, null, 2);
  },
});

server.addTool({
  name: "query_notion_pages",
  description: "Query pages from a Notion database",
  parameters: z.object({
    databaseId: z.string(),
  }),
  execute: async ({ databaseId }) => {
    const pages = await notion.queryDatabase(databaseId);
    return JSON.stringify(pages, null, 2);
  },
});

server.addTool({
  name: "get_github_repo_info",
  description: "Get GitHub repository information",
  parameters: z.object({
    owner: z.string(),
    repo: z.string(),
  }),
  execute: async ({ owner, repo }) => {
    const repoInfo = await github.getRepository(owner, repo);
    return JSON.stringify(
      {
        name: repoInfo.name,
        description: repoInfo.description,
        stars: repoInfo.stargazers_count,
        language: repoInfo.language,
      },
      null,
      2,
    );
  },
});

// Start server
server.start({ transportType: "stdio" });
