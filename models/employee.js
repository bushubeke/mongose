// Name,DateofBirth,Gender,Salary
const mongoose = require('mongoose');

// async function main() {
//     await mongoose.connect(process.env['MONGO_URI'],{ useNewUrlParser: true});;
//   }

mongoose.connect(process.env['MONGO_URI'],{ useNewUrlParser: true});


// await mongoose.connect(process.env.MONGO_URI);

const employeeSchema= new mongoose.Schema({
    Name:{type : String, required :true,default :"Redate"},
    DateofBirth: {type :Date, required : true, default:Date.now},
    Gender:{ type: String, enum: [ "Male", "Female" ],required :true,default : "Male"},
    Salary: {type :Number ,required : true, default : 10000}
})

const Employee=mongoose.model("Employee",employeeSchema);
// ##############################################################3
// ##############################################################
// EMPLOYE OPERATIONS
// ##############################################################3
// ##############################################################


// data={name: "Jane Doe", DateofBirth: Date.now, Gender:"Male",Salary:14000 }
// ####################################################################################
//  create single employee

function createAndSaveEmployee(mdata){
    let JaneDoe=Employee(mdata);
    JaneDoe.save(function(err, data) {
               if (err) return console.error(err);
                            });
           };

// ###################################################################################
// update employe after finding by id
function updateAndSaveEmployee(id,udata){
    try {
       let filter={_id : id}
  
       let upemp= Employee.findByIdAndUpdate(filter, udata,{new : true},(err, updatedDoc) => {
        if(err) return console.log(err);
            updatedDoc      })     
        
        
    } catch (error) {
        console.log(error)
        
    }
   
}
// // ####################################################################################
// get single employee by id
function getSingleEmployee(id){
    try {
        console.log("####")
    
        return Employee.findById(id).select("Name DateofBirth Gender Salary")    
    } catch (error) {
        console.log(error)
    }
    

}
// // ###################################################################################
//  get All employees
function getAllEmployee() {
    
    try {
        
       return  Employee.find({}).select("Name DateofBirth Gender Salary")
   

    } catch (error) {
        console.log(error)
    }
     
     
     

}
// // ###################################################################################
// //  Delete Employee by id
function deleteEmployee(id){
    let filter={_id : id}
    Employee.findByIdAndDelete(filter,(err, removedDoc) => {
        if(err) return console.log(err);
          removedDoc;
      })
   };








// ##############################################################3
// ##############################################################
exports.Employee = Employee;
exports.getAllEmployee = getAllEmployee;
exports.createAndSaveEmployee= createAndSaveEmployee;
exports.updateAndSaveEmployee= updateAndSaveEmployee;
exports.delteEmployee=deleteEmployee;
exports.getSingleEmployee = getSingleEmployee;
