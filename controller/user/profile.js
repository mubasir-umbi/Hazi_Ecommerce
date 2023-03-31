const Address = require('../../model/address')
const User    = require('../../model/userModel')



module.exports = {
   
 /// Load Profile/////

 loadProfile : (req, res) => {

    const userData = req.session.user
    res.render('user/profile/about_me', {userData})
},


/// To get manage address page ///


 manageAdress : async(req, res) => {
    try {
        const userData = req.session.user
        const id       = userData._id
        
        const userAddress = await Address.find({userId : id})
        res.render('user/profile/manage_address', {userAddress, userData})
    } catch (error) {
        console.log(error);
    }
},


//// To add new address  ////


addNewAddress : (req, res) => {
    try {
        res.render('user/profile/add_new_address')
    } catch (error) {
        console.log(error);
    }
},


//// To add new address ////


addNewAddressPost: async(req, res) => {
    try {
        const userData = req.session.user
        const id       = userData._id
        
        const adress = new Address({
            userId      : id,
            name        : req.body.name,
            mobile      : req.body.mobile,
            adressLine1 : req.body.address1,
            adressLine2 : req.body.address2,
            city        : req.body.city,
            state       : req.body.state, 
            pin         : req.body.pin, 
            is_default  : false,
        })

        const adressData = await adress.save()
        res.redirect('/adresses')
    } catch (error) {
        console.log(error);
    }
},


///// Edit user details  //////


editDetails: (req, res) => {

    try {
        const userData = req.session.user
        res.render('user/profile/edit_user', {userData})
    } catch (error) {
        console.log(error);
    }
},


/// Update edited user details  ////


updateDetails: async (req, res) => {
    try {
        const id = req.params.id

        await User.findByIdAndUpdate(id, {$set:{
            name   : req.body.name,
            mobile : req.body.email
        }}, {new : true})

        res.redirect('/profile')
        
    } catch (error) {
        console.log(error); 
    }   
 },


///// To delete addresss  ////

 deleteAddress: async(req, res) => {
    try {
        const id = req.params.id

        await Address.findByIdAndDelete(id)
        res.redirect('/adresses')
    } catch (error) {
        console.log(error);
    }
 },

 
}