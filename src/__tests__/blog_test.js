import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import Sinon from "sinon";

import app from "../server";
// import Article from '../models/article'

import cloudinary from "../config/claudinary";

// import dotenv from 'dotenv';
// import User from '../models/userModel'

const testingData = {
  title: "testing article title",
  content: "testing article content",
};
const testingDataUpdate = {
  title: "testing article title update",
  content: "testing article content update",
  image: "",
};
const tester = {
  username: "James",
  email: "admin1@gmail.com",
  password: "123456",
};

const admin = {
  email: "admin1@gmail.com",
  password: "123456",
};

chai.expect();
chai.use(chaiHttp);

jest.setTimeout(4000000);
describe("Testing Blog routes", () => {
  const sandbox = Sinon.createSandbox();
  beforeAll(async () => {
    sandbox.stub(cloudinary, "upload").resolves({
      url: "wazaa",
    });
    // await Article.deleteMany();
    // await User.deleteMany();
    // await chai.request(app).post('/api/account/signUp').send((tester));
  }),
    afterEach(async () => {}),
    afterAll(async () => {
      //   await Article.deleteMany();
      //   await User.deleteMany();
    }),
    it("should create new blog article.", async () => {
      //   const r1 = await chai
      //     .request(app)
      //     .post("/api/account/signUp")
      //     .send(tester);
      const res = await chai
        .request(app)
        .post("/api/add/blog/")
        .field("title", testingData.title)
        .field("content", testingData.content)
        .attach("image", path.resolve(__dirname, "./mock/tee.jpg"));
      expect(res.status).to.be.equal(200);
    });
});
