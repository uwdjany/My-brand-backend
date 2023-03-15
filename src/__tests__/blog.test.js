import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import Sinon from "sinon";
import app from "../server";
import cloudinary from "../config/claudinary";


const tester = {
  firstName: "adminName1",
  lastName:"adminName2",
  email: "admin2@gmail.com",
  role:"admin",
  password: "123",
};

const admin = {
  email: "admin2@gmail.com",
  password: "123",
};
const testingData = {
  title: "testing article title",
  content: "testing article content",
};

const testingDataUpdate = {
  title: "testing article title update",
  content: "testing article content update",
  image: "",
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
    
  }),
    afterEach(async () => {}),
    afterAll(async () => {
    
    }),
    it("should create new blog article.", async () => {
        const r1 = await chai
        .request(app)
        .post("/api/user/create")
        .send(tester);
      const res = await chai
        .request(app)
        .post("/api/blog/add")
        .field("title", testingData.title)
        .field("content", testingData.content)
        .attach("image", path.resolve(__dirname, "./mock/profigit.jpeg"))
        .set("Authorization",`Bearer ${r1.body.user.token}` )
      expect(res.status).to.be.equal(200);
    }),

    it("should get all blog", async ()=>{
      const res = await chai.request(app).get("/api/blog/");
      expect(res.status).to.be.equal(200)
    }),

    it("should update blog" , async ()=>{
      const signUp = await chai
      .request(app)
      .post("/api/user/create")
      send(tester);

      const  adminLogin = await (await chai.request(app).post("/api/user/create")).send(admin);
      const token = `Bearer ${adminLogin.body.user.token}`;
      const res1 = await chai
      .request(app)
      .post("/api/blog/add")
      .send(testingData)
      .set("Authorization",token);

      const article = await chai.request(app).get("/api/blog/");
      const id =article.body[0]._id;

      const res = await chai
      .request(app)
      .put(`/api/blog/update/${id}`)
      .send(testingDataUpdate)
      .set("Authorization", token);
      expect(res.status).to.be.equal(200);
    }),
    it("should get one blog by id", async () => {
      const article = await chai.request(app).get("/api/blog/");
      const id = article.body[0]._id;
      const res = await chai.request(app).get(`/api/blog/${id}`);
      expect(res.status).to.be.equal(200);
    }),
    it("should delete blog article", async () => {
      const signUp = await chai
        .request(app)
        .post("/api/user/create")
        .send(tester);
      const adminSignin = await chai
        .request(app)
        .post("/api/user/login")
        .send(admin);
      const token = `Bearer ${adminSignin.body.user.token}`;
      const article = await chai.request(app).get("/api/articles/");

      const id = article.body[0]._id;
      const res = await chai
        .request(app)
        .delete(`/api/articles/${id}`)
        .set("Authorization", token);

      expect(res.status).to.be.equal(200);
    })

});
