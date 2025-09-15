import { Octokit } from "@octokit/rest";

export class GitHubService {
  private octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getRepository(owner: string, repo: string) {
    const { data } = await this.octokit.rest.repos.get({ owner, repo });
    return data;
  }

  async getFileContent(owner: string, repo: string, path: string) {
    const { data } = await this.octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    if ("content" in data && data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    return null;
  }

  async listBranches(owner: string, repo: string) {
    const { data } = await this.octokit.rest.repos.listBranches({
      owner,
      repo,
    });
    return data;
  }
}
