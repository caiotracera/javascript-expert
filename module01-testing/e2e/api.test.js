const request = require("supertest");
const { describe, it } = require("mocha");
const { deepStrictEqual } = require("assert");

const app = require("./api");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      deepStrictEqual(response.text, "Hello world!");
    });
  });
});
