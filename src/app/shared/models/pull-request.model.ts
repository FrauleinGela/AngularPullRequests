export class PullRequest {
  constructor(
    public number: number,
    public state: string,
    public title: string,
    public body?: string,
    public created_at?: string
  ) { }
}
