const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");

describe("Authentication API", () => {

  it("should register user", async () => {

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `user${Date.now()}@gmail.com`,
        password: "123456",
        role: "customer"
      });

    expect(res.status).to.equal(201);
  });

  it("should login user", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "customer@gmail.com",
        password: "123456"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

});
