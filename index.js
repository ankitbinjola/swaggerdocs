const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let courses = [
    {
        id: "111",
        name: "reactjs",
        price: 999
    },
    {
        id: "123",
        name: "nodejs",
        price: 999
    },
    {
        id: "113",
        name: "Angular",
        price: 999
    }
]

app.get("/", (req, res) => {
res.send("hello world");
});


app.get("/api/v1/lco", (req, res) => {
    res.send("hello world from lco");
});


// sending json response

app.get("/api/v1/lcoobject", (req, res) => {
    res.send({id: "112", name: "pro backend", price: 112});
})


// sending array of objects response

app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
})


app.listen(4000, ()=> {
    console.log('server running');
});