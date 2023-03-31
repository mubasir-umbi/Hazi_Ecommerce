const User = require('../../model/userModel') 
const Product = require('../../model/productModel')


const loadWishlist = async(req, res) => {
    try {
        const userData = req.session.user
        const userId   = userData._id

       const user     = await User.findById(userId).populate('wishlist')
       const wishItem = user.wishlist

       console.log(user, 'userrrrrrrrrrrrrrrrrrrrrrrr');
       console.log(wishItem, 'wish itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
    

        res.render('user/profile/wishlist', {userData, wishItem})
    } catch (error) {
        console.log(error);
    }

 }


 const addToWishList = async(req, res) => {
    try {
        const userData = req.session.user
        const userId   = userData._id
        const proId    = req.query.id

        const user       = await User.findById(userId)
        const itemExists = user.wishlist.includes(proId)

    if (!itemExists) {
      await User.updateOne({ _id: userId }, { $push: { wishlist: proId }})
      await Product.updateOne({ _id: proId }, { isWishlisted : true })
      res.json({ 
        message: 'Added',
        
     })
    } else {
      res.json({
         message : 'Exist',
     })
    }
        
    } catch (error) {
        console.log(error);
    }
 }



//  const removeFromWishlist = async(req, res) => {
//     try {
//         const userData = req.session.user
//         const userId   = userData._id
//         const proId    = req.query.id

//         const user       = await User.findById(userId)
//         const itemExists = user.wishlist.includes(proId)

//         console.log(user, 'userrrrrrrrrrrrrrrrrrrrrrrrrrr');
//         console.log(itemExists, 'userrrrrrrrrrrrrrrrrrrrrrrrrrr itemExistsssssssssssss ');


//     if (!itemExists) {
//       await User.updateOne({ _id: userId }, { $pull: { wishlist: proId }})
//       await Product.updateOne({ _id: proId }, { isWishlisted : false })
//       res.json({ 
//         message: 'Item removed from wishlist!',
//         status : true
//      })
//     } else {
//       res.json({ message: 'Item not in wishlist!' })
//     }
        
//     } catch (error) {
//         console.log(error);
//     }
//  }


 const removeFromWishList = async(req, res) => {
    try {
      const userData = req.session.user
      const userId   = userData._id
      const proId    = req.query.id
  
      const user      = await User.findById(userId)
      const itemIndex = user.wishlist.indexOf(proId)
  
      if (itemIndex >= 0) {
        await User.updateOne({ _id: userId }, { $pull: { wishlist: proId }})
        await Product.updateOne({ _id: proId }, { isWishlisted: false })
        res.json({
          message: 'Item removed from wishlist!',
          status: true
        })
      } else {
        res.json({ message: 'Item not found in wishlist!' })
      }
  
    } catch (error) {
      console.log(error);
    }
  }
  
 


 module.exports = {
    loadWishlist,
    addToWishList,
    removeFromWishList,
 }