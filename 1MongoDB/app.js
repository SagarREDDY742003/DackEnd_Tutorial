let express = require('express');
let app = express();
let port = 9090;
let {ObjectId} = require('mongodb');
let bodyParser = require('body-parser');
let cors = require('cors');
let { dbConnect, getData , postData , deleteData, updateData} = require('./Controller/dbController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//////////////////////GET DATA///////////////////////
app.get('/',(req,res) => {
    res.send("HI FROM AIML")
})

app.get('/student', async(req,res) => {
    let query = {};
    let collection = "student";
    let output = await getData(collection,query);
    res.send(output);
})

app.get('/studentDetails/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {"id":Number(id)};
    let collection = "student";
    let output = await getData(collection,query);
    res.send(output);
})
app.get('/student/:year', async(req,res) => {
    let year = Number(req.params.year);
    let query = {"year":Number(year)};
    let collection = "student";
    let output = await getData(collection,query);
    res.send(output);
})
app.get('/dept/:deptName', async(req,res) => {
    let deptName = req.params.deptName;
    let query = {"dept_name":(deptName)};
    let collection = "student";
    let output = await getData(collection,query);
    res.send(output);
})
app.get('/stud', async(req,res) => {
    let query = {};
    if(req.query.year && req.query.deptName){
        query = {
            "year":Number(req.params.year),
            "dept_name":(req.params.deptName)
        }
    }
    else if(req.query.year){
        query = {"year":Number(req.query.year)} 
     }else if(req.query.deptName){
         query = {"dept_name":(req.query.deptName)}
     }
    let collection = "student";
    let output = await getData(collection,query);
    res.send(output);
})

///////////////////POST DATA/////////////////////////////
app.post('/postData', async(req,res) => {
    let data = req.body;
    let collection = 'student';
    let response = await postData(collection,data);
    res.send(response);
})
//////////////////UPDATE DATA///////////////////////////////
app.put('/updateData', async(req,res) => {
    let collection = 'student';
    let condition = {"_id":new ObjectId(req.body._id)}
    let data = {
        $set:{
            "dept_name":req.body.dept_name
        }
    }
    let output = await updateData(collection,condition,data)
    res.send(output)
})
////////////////DELETE DATA//////////////////////////////
app.delete('/deleteData', async(req,res) => {
    let collection = 'student';
    let condition = {"_id":new ObjectId(req.body._id)}
    let output = await deleteData(collection,condition)
    res.send(output)
})

app.listen(port,(err) => {
    dbConnect();
    if(err) throw err;
    console.log(`server is running on port ${port}`);
})