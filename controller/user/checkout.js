const Address = require('../../model/address')
const User    = require('../../model/userModel')
const Order   = require('../../model/order')
const Coupon  = require('../../model/coupon')
const Product = require('../../model/productModel')
const Razorpay = require('razorpay');
const { log } = require('handlebars')


const loadCheckout = async (req, res) => {

    const userData = req.session.user
    const userId   = userData._id

    console.log(userData.wallet, 'hiiii am from checkout walletttttttttttttttttt');

    const addressData = await Address.find({userId : userId})

    const userDataa  = await User.findOne({ _id: userId }).populate("cart.product").lean()
    const cart       = userDataa.cart

    console.log(cart, 'cart aaaannnnnnnnnnnnnnn')

    let subTotal = 0
    cart.forEach((val)=>{
    val.total = val.product.price * val.quantity
    subTotal += val.total
    })


    const now = new Date();
    const availableCoupons = await Coupon.find({ 
      expiryDate: { $gte: now },
      usedBy: { $nin: [userId] }
    });

    console.log(availableCoupons , 'helooooooooooo coupon aaann');

        res.render('user/checkout/checkout', { userData, cart, addressData, subTotal, availableCoupons })    
}



const checkStock = async (req, res) => {
    const userData = req.session.user;
    const userId = userData._id;
  
    // console.log(userData.wallet, 'hiiii am from checkout walletttttttttttttttttt');
  
    // const addressData = await Address.find({ userId: userId });
  
    const userDataa = await User.findOne({ _id: userId }).populate("cart.product").lean();
    const cart = userDataa.cart;
  
    console.log(cart, 'cart aaaannnnnnnnnnnnnnn');
  
    // let subTotal = 0;
    // cart.forEach((val) => {
    //   val.total = val.product.price * val.quantity;
    //   subTotal += val.total;
    // });
  
    let stock = [];
    cart.forEach((el) => {
      if ((el.product.stock - el.quantity) <= 0) {
        stock.push(el.product);
      }
    });
  
    console.log(stock, 'stockkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
  
    if (stock.length > 0) {
      console.log('Sending JSON response with stock array');
      res.json(stock);
    } else{
        res.json('ok')
    }
    // else {
    //   console.log('Rendering checkout page');
    //   res.render('user/checkout/checkout', { userData, cart, addressData, subTotal });
  
    // }
  };
  

const loadCheckou = async (req, res) => {

    const userData = req.session.user
    const userId   = userData._id

    console.log(userData.wallet, 'hiiii am from checkout walletttttttttttttttttt');

    const addressData = await Address.find({userId : userId})

    const userDataa  = await User.findOne({ _id: userId }).populate("cart.product").lean()
    const cart       = userDataa.cart

    console.log(cart, 'cart aaaannnnnnnnnnnnnnn')

    let subTotal = 0
    cart.forEach((val)=>{
    val.total = val.product.price * val.quantity
    subTotal += val.total
    })

    let stock = []
      cart.forEach((el) => {
      if((el.product.stock - el.quantity) <= 0){
        stock.push(el.product)
      }
    })

    console.log(stock, 'stockkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')

    if(stock.length > 0){
        console.log('njana res jssonnnnnnnnnnnnnnnnnnnnn');
        res.json(stock)
    }else{
        console.log('heloooooooooo mann am from stock length');
        res.render('user/checkout/checkout', { userData, cart, addressData, subTotal })
    }    
}


///////////  Place order function /////////////


const placeOrder = async(req, res) => {


    try {  
       const userData  = req.session.user
       const userId    = userData._id
       const addressId = req.body.selectedAddress
       const payMethod = req.body.selectedPayment

       const userDataa = await User.findOne({ _id: userId }).populate("cart.product")
       const cartPro   = userDataa.cart

       let subTotal = 0

       cartPro.forEach((val)=>{
       val.total = val.product.price * val.quantity
       subTotal += val.total
       })


       let productDet = cartPro.map(item => {
        return {
            id       : item.product._id,
            name     : item.product.name,
            price    : item.product.price,
            quantity : item.quantity,
            image    : item.product.imageUrl[0],
        }
       })


       const result  = Math.random().toString(36).substring(2, 7);
       const id      = Math.floor(100000 + Math.random() * 900000);
       const ordeId = result + id;
       
       

       /// order saving function


       let saveOrder = async () => {

        if(req.body.couponData){
          const order = new Order({
            userId  : userId,
            product : productDet,
            address : addressId,
            orderId : ordeId,
            total   : subTotal,
            paymentMethod    : payMethod,
            discountAmt      : req.body.couponData.discountAmt,
            amountAfterDscnt : req.body.couponData.newTotal,
            coupon           : req.body.couponName,
        })

        const ordered = await order.save()


        }else{
            const order = new Order({
                userId  : userId,
                product : productDet,
                address : addressId,
                orderId : ordeId,
                total   : subTotal,
                paymentMethod    : payMethod,     
            })
    
            const ordered = await order.save()

        }        

        let userDetails = await User.findById(userId)
        let userCart    = userDetails.cart

        userCart.forEach( async item=> {
            const productId = item.product
            const qty       = item.quantity

            const product       = await Product.findById(productId)
            const stock         = product.stock
            const updatedStock  = stock - qty

            await Product.updateOne(
                { _id: productId },
                { $set: { stock: updatedStock, isOnCart: false } }
              );
              
        })

     
        userDetails.cart = []
        await userDetails.save()
        console.log(userDetails.cart);
      }


       if ( addressId ){
        if( payMethod === 'cash-on-delivery' ){
            console.log('hellooo from cash on delivery..................');

          saveOrder()

          res.json({ 
            CODsucess : true,
            toal      : subTotal
        }) 
     }



        if(payMethod === 'razorpay'){
              
            console.log(req.body);
            console.log('helooo from razoor pay..............................................');

            const amount = req.body.amount

            var instance = new Razorpay({ 
                key_id: "rzp_test_6u4aUWyjD4kZvI", 
                key_secret: "BHpzGbf03O8ttvTONBk2LokC"
             })

            const order = await instance.orders.create({
                amount: amount * 100,
                currency: 'INR',
                receipt: 'mubashir',
            })

            saveOrder()

            res.json({
                razorPaySucess : true,
                order,
                amount, 
            })

            
        }

        /// payment method wallet function


         if ( payMethod === 'wallet' ){
            console.log('he he he am from wallet.................')
            const newWallet = req.body.updateWallet
            const userData  = req.session.user

            console.log(newWallet, 'new wallettttttttttttttttttt');
             
           await User.findByIdAndUpdate(userId, { $set:{ wallet:newWallet }},  { new : true })
        //    userData = updatedUser
        //    req.session.user = userData


            saveOrder()

            res.json(newWallet)
        }
       }  

       
    } catch (error) {
        console.log(error);
    }
}


//// Validate coupon ////////////


// const validateCoupon = async (req, res) => {
//     try {
//         console.log(req.body,  'bodyyyyyyyyyyyyyyyyyyyyyy');
//         const {couponVal, subTotal}  = req.body
//         const coupon   = await Coupon.findOne({code : couponVal})

//         if(!coupon){
//             res.json('invalid')
//         }else{

//             const couponId = coupon._id
//             const discount = coupon.discount
//             const expiryDt = coupon.expiryDate
//             const userId   = req.session.user._id
//             // console.log(coupon, 'helooo from coupon..../////////////');
           
//             const isCpnAlredyUsed = await Coupon.findOne({_id : couponId, usedBy: { $in: [userId]}})

//             if(isCpnAlredyUsed){
//                 /// alredy used
//                 res.json('alredy used')
//             }else{
//                 /// apply coupon
//                 await Coupon.updateOne({_id : couponId}, { $push: { usedBy: userId }})

//                 const discnt      = Number(discount)
//                 const discountAmt = (subTotal * discnt) / 100 
//                 const newTotal    = subTotal - discountAmt

//                 const user = User.findById(userId)

//                 // console.log(user, '..........')

//                 res.json({
//                     discountAmt,
//                     newTotal,
//                     discount,
//                     sucess : 'sucess'
//                 })
//             }
//         }

//     } catch (error) {
//         console.log(error); 
//     }
// }



const validateCoupon = async (req, res) => {
    try {
        console.log(req.body, 'bodyyyyyyyyyyyyyyyyyyyyyy');
        const { couponVal, subTotal } = req.body;
        const coupon = await Coupon.findOne({ code: couponVal });

        if (!coupon) {
            res.json('invalid');
        } else if (coupon.expiryDate < new Date()) {
            res.json('expired');
        } else {
            const couponId = coupon._id;
            const discount = coupon.discount;
            const userId = req.session.user._id;

            const isCpnAlredyUsed = await Coupon.findOne({ _id: couponId, usedBy: { $in: [userId] } });

            if (isCpnAlredyUsed) {
                res.json('already used');
            } else {
                await Coupon.updateOne({ _id: couponId }, { $push: { usedBy: userId } });

                const discnt = Number(discount);
                const discountAmt = (subTotal * discnt) / 100;
                const newTotal = subTotal - discountAmt;

                const user = User.findById(userId);

                res.json({
                    discountAmt,
                    newTotal,
                    discount,
                    succes: 'succes'
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};






module.exports = {
    loadCheckout,
    placeOrder,
    validateCoupon,
    checkStock,
}