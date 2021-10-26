const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const optionsSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      description: "Esto es una Api para proyecto Sensores",
      version: "1.0.0",
      title: "Sensores API",
      contact:{
        email: "iburgos@outlook.cl"
      }
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
  },
  apis: ["./api/api.yaml"]
}


const specs = swaggerJsDoc(optionsSpec);

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500','https://masterplant.com', 'http://asimov.cl','http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

require('./utils/auth');

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
