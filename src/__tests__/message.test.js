

import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
import Message from "../models/message";
import dotenv from 'dotenv';
import app from '../app';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
dotenv.config();
import User from '../models/userModel'

const testingMessage={
    name:"m",
    email:"takua@gmail.com",
    message:"testing message"
}

const admin={
    email:'admin2@gmail.com',
    password:'123'
}
const tester = {
    username: 'Uwase',
      email: 'uwase@gmail.com',
      password: '123'
  
  };

chai.expect();
chai.use(chaiHttp);
jest.setTimeout(200000)
describe('Testing message routes',()=>{
    beforeAll(async()=>{
        await User.deleteMany({
			where: { email: { $not: ['admin2@gmail.com'] } },
		});
    })
    afterEach(async()=>{
        await Message.deleteMany()
    }),
    afterAll(async()=>{
      await User.deleteMany()
    })

  
    it('should send message',async()=>{
        const res= await chai.request(app).post('/api/message/send').send(testingMessage)
        expect(res.status).to.be.equal(200);
    })
    it('should get all messages',async()=>{
        const signUp=await chai.request(app).post('/api/create/user').send((tester));
        const token = `Bearer ${signUp.body.user.token}`;
        const res= await chai.request(app).get('/api/message/').set('Authorization', token)
        console.log(res.body)
        expect(res.status).to.be.equal(200);

   
    })

})