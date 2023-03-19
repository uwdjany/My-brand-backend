import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import Sinon from "sinon";

import app from "../server";
import Article from "../db/model/blog";

import cloudinary from "../config/claudinary";

import dotenv from "dotenv";
import User from "../db/model/user";

dotenv.config();

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
  firstName: "testname1",
  lastName: "testname2",
  email: "admin@gmail.com",
  password: "123456",
};

const adminUser = {
  firstName: "testname1",
  lastName: "testname2",
  email: "admin@gmail.com",
  password: "123456",
  role: "admin",
};

const admin = {
  email: "admin@gmail.com",
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
    await Article.deleteMany();
    await User.deleteMany();
    // await chai.request(app).post('/api/account/signUp').send((tester));
  }),
    // beforeEach(async()=>{
    //      await chai.request(app).post('/api/account/signUp').send((tester));
    // })

    afterEach(async () => {}),
    afterAll(async () => {
      await Article.deleteMany();
      await User.deleteMany();
    }),
    it("should create new blog article.", async () => {
      const r1 = await chai
        .request(app)
        .post("/api/user/create")
        .send(adminUser);
      const signin = await chai
        .request(app)
        .post("/api/user/login")
        .send(admin);
      const res = await chai
        .request(app)
        .post("/api/blog/add")
        .field("title", testingData.title)
        .field("content", testingData.content)
        .attach("image", path.resolve(__dirname, "./mock/profigit.jpeg"))
        .set("Authorization", `Bearer ${signin.body.data.token}`);
      expect(res.status).to.be.equal(200);
    });
  it("should get all blog articles.", async () => {
    const res = await chai.request(app).get("/api/blog/");
    expect(res.status).to.be.equal(200);
  }),
    it("should get one blog article by id", async () => {
      const article = await chai.request(app).get("/api/blog/");
      const id = article.body.data[0]._id;
      const res = await chai.request(app).get(`/api/blog/${id}`);
      expect(res.status).to.be.equal(200);
    });
  it("should update blog article", async () => {
    const adminSignin = await chai
      .request(app)
      .post("/api/user/login")
      .send(admin);
    const token = `Bearer ${adminSignin.body.data.token}`;
    const res1 = await chai
      .request(app)
      .post("/api/blog/add")
      .send(testingData)
      .set("Authorization", token);
    const article = await chai.request(app).get("/api/blog/");
    const id = article.body.data[0]._id;

    const res = await chai
      .request(app)
      .put(`/api/blog/update/${id}`)
      .send(testingDataUpdate)
      .set("Authorization", token);

    expect(res.status).to.be.equal(200);
  }),
    it("should delete blog article", async () => {
      const adminSignin = await chai
        .request(app)
        .post("/api/user/login")
        .send(admin);
      const token = `Bearer ${adminSignin.body.data.token}`;
      const article = await chai.request(app).get("/api/blog/");

      const id = article.body.data[0]._id;
      const res = await chai
        .request(app)
        .delete(`/api/blog/delete/${id}`)
        .set("Authorization", token);

      expect(res.status).to.be.equal(200);
    });
  it("should comment on blog article", async () => {
    const adminSignin = await chai
      .request(app)
      .post("/api/user/login")
      .send(admin);
    const token = `Bearer ${adminSignin.body.data.token}`;
    const article = await chai.request(app).get("/api/blog/");
    const id = article.body.data[0]._id;
    const res = await chai
      .request(app)
      .post(`/api/blog/${id}/comment`)
      .send(testingDataUpdate)
      .set("Authorization", token)
      .send({ comment: "that content is very helpful thanks" });
    expect(res.status).to.be.equal(200);
  }),
    it("should like on blog article", async () => {
      const adminSignin = await chai
        .request(app)
        .post("/api/user/login")
        .send(admin);
      const token = `Bearer ${adminSignin.body.data.token}`;
      const article = await chai.request(app).get("/api/blog/");
      const id = article.body.data[0]._id;
      const res = await chai
        .request(app)
        .post(`/api/blog/${id}/like`)
        .send(testingDataUpdate)
        .set("Authorization", token)
        .send({ article_id: id });
      expect(res.status).to.be.equal(200);
    });
});
