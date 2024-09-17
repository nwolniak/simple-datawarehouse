export class ConnectionParameters {
  constructor(
    public driverClassName: string,
    public driver: string,
    public host: string,
    public port: string,
    public database: string,
    public username: string,
    public password: string,
  ) {}
}
