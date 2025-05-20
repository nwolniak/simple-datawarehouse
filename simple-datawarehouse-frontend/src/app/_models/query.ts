export class Query {
  constructor(
    public columnList: Column[],
    public table: string,
    public joinList: Join[],
    public groupByList: string[],
    public havingList: Having[],
    public orderByList: OrderBy[],
    public whereList: Where[]) {
  }
}

export class Column {
  constructor(
    public name: string,
    public alias: string,
    public aggregate: string) {
  }
}

export class Join {
  constructor(
    public joinType: string,
    public tableName: string,
    public conditions: Condition[]) {
  }
}

export class Condition {
  constructor(
    public leftOperand: string,
    public operator: string,
    public rightOperand: string) {
  }
}

export class OrderBy {
  constructor(
    public columnName: string,
    public ascending: boolean) {
  }
}

export class Where {
  constructor(
    public columnName: string,
    public operator: string,
    public value: string) {
  }
}

export class Having {
  constructor(
    public columnName: string,
    public operator: string,
    public value: string) {
  }
}
