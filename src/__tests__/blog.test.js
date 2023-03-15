import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import Sinon from "sinon";
import app from "../server";
import cloudinary from "../config/claudinary";
const testingData = {
  title: "testing article title",
  content: "testing article content",
};

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
        .post("/api/add/blog")
        .field("title", testingData.title)
        .field("content", testingData.content)
        .attach("image", path.resolve(__dirname, "./mock/profigit.jpeg"))
      expect(res.status).to.be.equal(200);
    });

    
});
