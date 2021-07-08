const NodeEnvironment = require("jest-environment-node");
const randomString = require("randomstring");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { PrismaClient } = require("@prisma/client");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config: any) {
    super(config);
    // Generate a unique schema identifier for this test context
    this.schema = `test_${randomString.generate({
      length: 16,
      charset: "alphanumeric",
      capitalization: "lowercase",
    })}`;
    // Generate the pg connection string for the test schema
    this.databaseUrl = "postgres://ko:ko@localhost:5432/ko";
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;
    this.client = new PrismaClient();
  }
  async setup() {
    console.log("inside setup");
    await this.client.$executeRaw(
      `create schema if not exists "${this.schema}"`
    );
    // Set the required environment variable to contain the connection string
    // to our database test schema
    const url = `${this.databaseUrl}?schema=${this.schema}`;
    process.env.DATABASE_URL = url;
    this.global.process.env.DATABASE_URL = url;
    await exec("npm run prisma:deploy");
    return super.setup();
  }
  async teardown() {
    // Drop the schema after the tests have completed
    console.log("inside teardown");
    await this.client.$executeRaw(
      `drop schema if exists "${this.schema}" cascade`
    );
    await this.client.$disconnect();
    return super.teardown();
  }
}
module.exports = PrismaTestEnvironment;