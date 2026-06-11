const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pizzeria API",
      version: "1.0.0",
      description: "Pizzeria Management System API"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
  User: {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      role: { type: "string" }
    }
  },

  MenuItem: {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      price: { type: "number" },
      category: { type: "string" },
      description: { type: "string" }
    }
  },

  Order: {
    type: "object",
    properties: {
      _id: { type: "string" },
      totalAmount: { type: "number" },
      status: { type: "string" },
      paymentStatus: { type: "string" }
    }
  },

  Bill: {
    type: "object",
    properties: {
      _id: { type: "string" },
      amount: { type: "number" },
      tax: { type: "number" },
      totalBill: { type: "number" }
    }
  }
}
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: [
    "./routes/*.js"
  ]
};

module.exports = swaggerJsDoc(options);