const User = require('../model/userModel')

const isLogin = async(req,res,next)=>{
    try {

        if(!req.session.user){
            res.redirect('/')
        }else{
            next()
        }
       
    } catch (error) {
        console.log(error.message);
    }

}


const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user){
            res.redirect('/')
        }else{
            next()
        }
      

    } catch (error) {
        console.log(error.message);
    }

} 


const logedin = async(req, res, next)=>{
    try {

        if(!req.session.user){
            res.redirect('/login')
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error.message);
    }

}

const blockCheck = async ( req, res, next ) => {

    const userData = req.session.user;
    const id = userData._id
    const user = await User.findById(id)

     if(user.isBlocked){
       res.redirect('/logout')
     }else{
        next()
   }
 }

module.exports ={
    isLogin,
    isLogout,
    logedin,
    blockCheck,
}