const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");

describe("Order APIs", () => {

  let customerToken;

  before(async () => {

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "customer@gmail.com",
        password: "123456"
      });

    customerToken = login.body.token;
  });

  it("should create order", async () => {

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        items: [
          {
            _id: "685000000000000000000001",
            name: "Veg Pizza",
            price: 250,
            quantity: 2
          }
        ],
        totalAmount: 500,
        deliveryMode: "Delivery",
        paymentOption: "COD"
      });

    expect(res.status).to.equal(201);
  });

  it("should get my orders", async () => {

    const res = await request(app)
      .get("/api/orders/my-orders")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.status).to.equal(200);
  });

});