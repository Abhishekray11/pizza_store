const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");

describe("Menu APIs", () => {

  let token;

  before(async () => {

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "customer@gmail.com",
        password: "123456"
      });

    token = login.body.token;
  });

  it("should fetch menu items", async () => {

    const res = await request(app)
      .get("/api/menu")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

});