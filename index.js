const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileupload = require('express-fileupload');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// to get json body in post request body parser middleware or express option
app.use(express.json());

//file uploadmiddle ware for images or other 
app.use(fileupload());




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


// sending data according to req params

app.get("/api/v1/courses/:courseId", (req, res) => {
    const myCourse = courses.find((course) => course.id === req.params.courseId)
    res.send(myCourse);
})


// sending data according to req params

app.post("/api/v1/addcourse", (req, res) => {
    courses.push(req.body);
    res.send(true);
})


// getting data according to query params

app.get("/api/v1/coursequery", (req, res) => {
    const location = req.query.location
    const device = req.query.device
    res.send({location, device});
})



// upload a file name:

app.post("/api/v1/uploadfile", (req, res) => {
    console.log(req.headers);
    const file = req.files.file
    let path = __dirname + '/images/' + Date.now() + ".jpg"

    file.mv(path, (err) => {
        res.send(true);
    })


})


app.listen(4000, ()=> {
    console.log('server running');
});