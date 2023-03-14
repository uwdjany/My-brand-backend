import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import User from '../db/model/user'
import "dotenv/config";
import server from '../server';


// console.log('db url',process.env.MONGO_TEST_URL)


const tester = {
  firstName: 'testname',
  lastName: 'testname',
   email: 'test@gmail.com',
	password: '1234'

};

chai.expect();
chai.use(chaiHttp);
jest.setTimeout(50000)

describe('Testing Auth routes', () => {

	beforeEach(async () => {
		await User.deleteMany({
			where: { email: { $not: ['test@gmail.com'] } },
		});
	});

  afterAll(async()=>{
    User.deleteMany()
  })

  it("should throw an error if the password value is empty", async () => {
    try {
     
      await new User({
        firstName: "u",
        lastName: "djany",
        email: "djan@gmail.com",
        password: ""
      }).save()
    } catch (err) {
      expect(err.errors.password.message).equal("Please add a password")
    }
  })

  it("should throw an error if the email value is empty", async () => {
    try {
     
      await new User({
        firstName: "u",
        lastName: "djany",
        email: "",
        password: "123"
      }).save()
    } catch (err) {
      expect(err.errors.email.message).equal("Please add a email")
    }
  })
	it('should register a user.', async () => {
		const res = await chai.request(server).post('/api/user/create').send((tester));
		expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a('object');
	});
	it('should login user.', async () => {
        
            const user = await chai.request(server).post('/api/user/create').send(tester);
            console.log(user)
            const res = await chai.request(server).post('/api/user/login').send({email:user.email,password:user.password});
            expect(res.status).to.be.equal(200);
            
        });

});


// const request = require('supertest')
// const server = request('../server');
// const User = require("../db/model/user");
// beforeEach(async()=>{
//     await User.deleteMany({})
// })
// test('should create an account for user', async ()=>{
//     await request(server).post('/api/user/create')
//     send({
//         firstName:'testfirstname',
//         lastName:'testlasttname',
//         email:'test@gmail.com',
//         password:'123'
//     })
//     .expect(201)
// })