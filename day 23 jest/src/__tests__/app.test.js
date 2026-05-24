const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("should return Hello,World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Hello, World!");
  });
});

describe("POST /api/auth/register", () => {
  it("should return message and user data", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "bhavishya",
      email: "bhavishya@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body).toHaveProperty("user");
  });
});
