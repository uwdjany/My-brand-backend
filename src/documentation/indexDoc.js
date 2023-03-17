const { Router } = require("express");
const { serve, setup } = require("swagger-ui-express");

const docrouter = Router();
import dotenv from "dotenv";

dotenv.config();


const options = {
  openapi: "3.0.1",
  info: {
    title: "My Brand",
    version: "1.0.0",
    description: "My Protofolio Backend.",
  },
 
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Users", description: "Users" },
    { name: "Blog", description: "Blogs" },
   
  ],
  paths: {
    "/api/user/create": {
      post: {
        tags: ["Users"],
        description: "User SigUp",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                firstName: "firstname",
                lastName: "secondname",
                email: "example@gmail.com",
                password: "123456",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New User was created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/user/login": {
      post: {
        tags: ["Users"],
        description: "User login",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "admin@gmail.com",
                password: "123456",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Invalid credation",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/user/all-user": {
        get: {
          tags: ["Users"],
          description: "Get All users",
          description:"This Api is used get All user from mongooDb ",
          parameters: [],
          security: [],
          responses: {
            200: {
              description: "successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/user/one-user/{id}":  {
        get: {
          security: [],
          tags: ["Users"],
          description: "Get One user by id",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
            },
          ],
          responses: {
            200: {
              description: "successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },

      "/api/user/update/{id}": {
        put: {
          tags: ["Users"],
          description: "Update a user",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
                example: {
                  firstName: "firstname",
                  lastName: "secondname",
                  email: "example@gmail.com",
                  password: "123456",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "successfully",
            },
            401: {
              description: "User Not Authorized",
            },
            404: {
              description: "Article doesn't exist!",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },


      "/api/blog": {
        get: {
          tags: ["Blog"],
          description: "Get All Blog Articles",
          parameters: [],
          security: [],
          responses: {
            200: {
              description: "successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      '/api/blog/add':{
        post:{
          tags:['Blog'],
          description:'Create new blog article',
      
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/Blog',
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'successfully',
            },
            401: {
              description: 'User Not Authorized',
            },
            500: {
                description: 'Internal Server Error'
            }
          }, 
        }
      },

      "/api/blog/delete/{id}": {
        delete: {
          tags: ["Blog"],
          description: "Delete blog article",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "successfully",
            },
            401: {
              description: "User Not Authorized",
            },
            404: {
              description: "Article doesn't exist!",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },

      "/api/blog/{id}":  {
        get: {
          security: [],
          tags: ["Blog"],
          description: "Get One user by id",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
            },
          ],
          responses: {
            200: {
              description: "successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
   
   
  
    
    "/api/user/delete/{id}": {
      delete: {
        tags: ["Users"],
        description: "Delete User by Id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/blog/delete/{id}": {
      delete: {
        tags: ["Blog"],
        description: "Delete Blog by Id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/blog/update/{id}": {
      put: {
        tags: ["Blog"],
        description: "Update blog article",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
              example: {
                title: "firstname",
                content: "secondname",
              
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/blog/{article_id}/comment": {
      post: {
        tags: ["Blog"],
        description: "Comment on article blog article",
        parameters: [
          {
            in: "path",
            name: "article_id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
              example: {
                comment: "that content is very helpful thanks",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/blog/{article_id}/like": {
      post: {
        tags: ["Blog"],
        description: "Like on article blog article",
        parameters: [
          {
            in: "path",
            name: "article_id",
           
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
             
            },
          },
         
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },




    
    "/api/message/send": {
      post: {
        tags: ["Message"],
        security: [],
        description: "Sending message",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Message",
              },
              example: {
                name: "user 's name",
                email: "example@gmail.com.com",
                message: "testing message",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/message/all": {
      get: {
        tags: ["Message"],
        description: "Getting all messages",
        parameters: [],
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "The auto-generated id of the user",
          },
          firstName: {
            type: "string",
            description: "User's firstname",
          },
          lastName: {
            type: "string",
            description: "User's lastname",
          },
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
        
          role: {
            type: "string",
            description: "User role",
            role:"users",
            enum:"admin,visitor",
            default:"visitor"
          },
        },
      },
      Blog: {
        type: "object",

        properties: {
          title: {
            type: "string",
            description: "Article title",
          },
          content: {
            type: "string",
            description: "Article content",
          },
          image: {
            type: "string",
            description: "Article image url",
            format: "binary",
          },

        },
      },

      Message: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description: "sender name",
          },
          email: {
            type: "string",
            description: "sender email",
          },
          message: {
            type: "string",
            description: "message",
            
          },

        },
      },
    //   Message: {
    //     type: "object",

    //     properties: {
    //       name: {
    //         type: "string",
    //         description: "sender name",
    //       },
    //       email: {
    //         type: "string",
    //         description: "sender email",
    //       },
    //       message: {
    //         type: "string",
    //         description: "message content",
    //       },
    //     },
    //   },
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

module.exports = docrouter;
