import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import "dotenv/config";
import server from "../server";

chai.use(chaiHttp);
jest.setTimeout(50000);

describe("Testing Auth routes", () => {
  it("should register a user.", async () => {
    const res = await chai.request(server).post("/api/user/create").send({
      firstName: "testname1",
      lastName: "testname2",
      email: "test10@gmail.com",
      password: "123",
    });
    console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
  }, 60003);
  it("should login user.", async () => {
    const res = await chai.request(server).post("/api/user/login").send({
      email: "test10@gmail.com",
      password: "123",
    });
    expect(res.status).to.be.equal(200);
  }, 60011);
});
