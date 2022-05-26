require('dotenv').config();
var cors = require('cors');
const express = require("express");
const app = express();
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();

app.use(cors())
// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const TIMEOUT = 10000;

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());




// ##################################
app.get('/', function (req, res) {
  res.json({"Message": "There is Nothing here"});
});
// #################################################################################
const createEmployee = require("./models/employee").createAndSaveEmployee
app.post("/employee",function(req,res){
  
    let result=req.body
 
    createEmployee(req.body)
    res.json({"Sucessfully Inserted": result.Name})
  })

// #################################################################################  
const getAllEmployee = require("./models/employee").getAllEmployee
app.get("/employee",function(req,res){
  
    let result=getAllEmployee()
    result.exec(function (err, employees) {
        if (err) return handleError(err);
            // JSON.stringify(employees)    
    //    
       return res.json(employees)
        
    });   
           
  })

// #################################################################################
const updateAndSaveEmployee = require("./models/employee").updateAndSaveEmployee;
app.put("/employee",function(req,res){
    let udata={ ...req.body}
    delete udata["_id"]
    // console.log(udata)
    // console.log(req.body._id)

    updateAndSaveEmployee(req.body._id,udata)
     res.json({"Message" : "sucessfully updated object with id "+req.body._id}) 
           
  })


// #################################################################################
const deleteEmployee = require("./models/employee").delteEmployee;
app.delete("/employee/:id",function(req,res){
    // console.log(req.params.id)
    deleteEmployee(req.params.id)
     res.json({"Message" : "sucessfully Deleted object with id "+req.parms.id}) 
           
  })


// #################################################################################
const getSingleEmployee = require("./models/employee").getSingleEmployee
app.get("/single/:id",function(req,res){
    console.log(req.params.id)
    let result= getSingleEmployee(req.params.id)
    result.exec(function (err, employee) {
        if (err) return handleError(err);
            // JSON.stringify(employees) 
              console.log(employee)   
               return res.json(employee)
        
    });   
           
  })

// ##################################
// Error handler
app.use(function (err, req, res, next) {
    if (err) {
      res
        .status(err.status || 500)
        .type("txt")
        .send(err.message || "SERVER ERROR");
    }
  });
  
  // Unmatched routes handler
  app.use(function (req, res) {
    if (req.method.toLowerCase() === "options") {
      res.end();
    } else {
      res.status(404).type("txt").send("Beimnet Edited Not Found");
    }
  });
  
  const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
  });
  