const User       = require('../../model/userModel')
const argon2     = require('argon2')
const userHelper = require('../../helpers/user.helper')
const Product    = require('../../model/productModel')
const Category   = require('../../model/categoryModel')
const Banners    = require('../../model/banner')
const { log } = require('handlebars')

let otp
let userOtp
let hashedPassword
let userRegData
let otpError = ''
let isLogedin = false
let userData
let userEmail
let productSearched = false
let message2 


//To load home

const loadHome = async(req, res)=>{
   
   try {
    const loadProData = await Product.find()
    const loadCatData = await Category.find()
    const banners     = await Banners.find()


    res.render('user/home',{userData, loadProData, loadCatData, banners})
    
   } catch (error) {
    console.log(error);
   }
}

//All product page


const getProduct = async(req, res)=>{
  try {

    const loadCatData = await Category.find()
    const proData = await Product.find({is_blocked : false})

        res.render('user/products', {proData, userData, loadCatData}) 
  } catch (error) {
    console.log(error);
  }
}


//Product details page


const ProductView = async(req, res)=>{
    try {
      const proId = req.query.id
      const proData = await Product.findById(proId)
    

      if (req.session.user) {
        res.render('user/productview', {proData, userData})
      }else{
        res.render('user/productview', {proData})    
      }
    } catch (error) {
        console.log(error);
    }
}


//user login page


const userLogin = (req, res)=>{

    let regSuccessMsg = 'User registered sucessfully..!!'
    let blockMsg      = 'Sorry something went wrong..!!'
    let mailErr       = 'Incorrect email or password..!!'
    let newpasMsg     = 'Your password reseted successfuly..!!'
    message2 = false


    if(req.session.mailErr){
        res.render('user/login', {mailErr})
        req.session.mailErr = false
    }
    else if(req.session.regSuccessMsg){
        res.render('user/login', {regSuccessMsg})
        req.session.regSuccessMsg = false
    }
    else if(req.session.userBlocked){
        res.render('user/login', {blockMsg})
        req.session.userBlocked = false
    }
    else if(req.session.LoggedIn){
        res.render('user/login')
        req.session.LoggedIn = false
    }
    else if(req.session.newPas){
        res.render('user/login', {newpasMsg})
        req.session.newPas = false
    }
    else{
        res.render('user/login')
    }
}


//user signup page

const usersignup = (req, res)=>{
    try {
        res.render('user/signup')
    } catch (error) {
        console.log(error);
    }
}

//To get otp page

const getOtp = (req, res)=>{
    try {
        res.render('user/submitOtp')
    } catch (error) {
        console.log(error);
    }
   }



//Submit otp and save user

const submitOtp = async (req, res)=>{
    try {
        userOtp = req.body.otp


        if(userOtp == otp){
            const user = new User({
                name: userRegData.name,
                email:userRegData.email,
                mobile: userRegData.phone,
                password: hashedPassword,
                isVerified: true,
                isBlocked: false  
            })
    
            await user.save()

            req.session.regSuccessMsg = true
            res.redirect('/login')
          }else{
            otpError = 'incorrect otp'
            res.render('user/submitOtp', {otpError})
      }  
    } catch (error) {
        console.log(error);
    }  
}


//To resend otp

const resendOtp =  async (req, res)=>{
    try {
        res.redirect('/get_otp')
        otp = await userHelper.verifyEmail(userEmail)
    } catch (error) {
        console.log(error);
    }
}


//User login


const doLogin = async(req, res)=>{
    
    try {
       let email    = req.body.email
       let password = req.body.password

       userData = await User.findOne({ email: email });

       if(userData){
          if (await argon2.verify(userData.password, password)){ 

                const isBlocked = userData.isBlocked

                if(!isBlocked){

                   req.session.LoggedIn = true
                   req.session.user =  userData

                   res.redirect('/')
                } else {
                   userData = null
                   req.session.userBlocked = true
                   res.redirect('/login')
                }
              }
              else {
                req.session.mailErr = true
                res.redirect('/login')
              }
            }else{
                req.session.mailErr = true
                res.redirect('/login')
            }    
     } catch (error) {
        console.log(error);
     }
}

//User logout


const doLogout = async(req,res)=>{
    try {
        req.session.destroy()
        userData = null
        // req.session.LoggedIn = false
        res.redirect('/login')

    } catch (error) {
        console.log(error.message);
    }
 }



//user signup

const doSignup = async(req, res)=>{

    try {
         hashedPassword  = await userHelper.hashPassword(req.body.password)
         userEmail       = req.body.email 
         userRegData     = req.body
        

        const userExist = await User.findOne({email: userEmail})
        if(!userExist){
              otp = await userHelper.verifyEmail(userEmail)
              res.render('user/submitOtp')
         }
        else{
            message2 = true

            res.render('user/login', {message2})
           
        }

    } catch (error) {
        console.log(error);     
    }   
}


const productSearch = async(req, res)=>{
    const { search, catId } = req.body

    console.log(search, catId);

    if(catId){   

        try {
            const products = await Product.find({ category: catId, name: { $regex: search, $options: 'i' } });
            res.json(products);
          } catch (error) {
            console.log(error);
            return res.status(500).send();
          }
          
          
     }else{
        try {
            const products = await Product.find({ name: { $regex: search, $options: 'i' } });
            console.log(products);

            res.json(products);
          } catch (error) {
            console.log(error);
            return res.status(500).send();
          }
          
     }
    }


    const sortProduct_az = async(req, res) => {
        try {
            const { sort, catId } = req.body
          
            if( catId ){
                const products = await Product.find({ category : catId }, {is_blocked: false}).sort({ name: sort });
                res.json(products)   
               
            } else{
                const products = await Product.find( {is_blocked: false}).sort({ name: sort });
                res.json(products)
            }

        } catch (error) {
            console.log(error);
        }
    }


    const sortProductByPrice = async(req, res) => {
        try {
            const { sort, catId } = req.body

            if(catId){
                const products = await Product.find({ category : catId }, {is_blocked: false}).sort({ price: sort });
                res.json(products)
            }else{               
            const products = await Product.find({is_blocked: false}).sort({ price: sort });
            res.json(products)
             }

        } catch (error) {
            console.log(error);
        }
    }



module.exports = {
    doLogout, 
    getProduct, 
    loadHome ,  
    ProductView, 
    userLogin, 
    usersignup, 
    doSignup, 
    submitOtp, 
    doLogin, 
    getOtp,
    resendOtp,
    productSearch,
    sortProduct_az,
    sortProductByPrice,
}