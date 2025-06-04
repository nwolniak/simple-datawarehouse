export class QueryResult {
  constructor(
    public columnList: string[],
    public rowList: Map<string, any>[],
    public sql: string) {
  }
}
