import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import "dotenv/config";
import server from "../server";

chai.expect();
chai.use(chaiHttp);
jest.setTimeout(50000);
chai.should();

describe("Testing Auth routes", () => {
  it("should register a user.", async () => {
    const res = await chai.request(server).post("/api/user/create").send({
      firstName: "testname1",
      lastName: "testname2",
      email: "renzo3@gmail.com",
      password: "123",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
  });
  it("should login user.", async () => {
    const res = await chai.request(server).post("/api/user/login").send({
      email: "admin@gmail.com",
      password: "123",
    });
    expect(res.status).to.be.equal(200);
  });
});
