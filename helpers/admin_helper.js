const User = require('../model/userModel')
const Category = require('../model/categoryModel')

/// To get all category data from database ///

const getAllCtegoryData = async()=>{
    try {
     const CtegoryData  =  await Category.find()
     return CtegoryData
    
    } catch (error) {
     console.log(error);
    }
 }

/// To get all users data from database ///


const getAllUsersData = async()=>{
   try {
    const usersData  =  await User.find()
    return usersData
   
   } catch (error) {
    console.log(error);
   }
}




module.exports = {
    getAllUsersData, 
    getAllCtegoryData, 
}