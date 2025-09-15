import { Client } from "@notionhq/client";

export class NotionService {
  private notion;

  constructor(token: string) {
    this.notion = new Client({ auth: token });
  }

  async queryDatabase(databaseId: string, filter = {}) {
    const response = await this.notion.databases.query({
      database_id: databaseId,
      ...(filter && { filter }),
    });
    return response.results;
  }

  async createPage(databaseId: string, properties: any) {
    const response = await this.notion.pages.create({
      parent: { database_id: databaseId },
      properties,
    });
    return response;
  }

  async readPage(pageId: string) {
    const response = await this.notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results;
  }
}
