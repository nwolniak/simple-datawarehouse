export interface Table {
  tableName: string;
  columns: string[];
  rows: { [key: string]: any }[];
}
