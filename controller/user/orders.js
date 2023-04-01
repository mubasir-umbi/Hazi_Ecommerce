const Orders  = require('../../model/order')
const Address = require('../../model/address')
const moment  = require('moment')
const pdfkit  = require('pdfkit')
const fs      = require('fs')
const helper  = require('../../helpers/user.helper')
const User    = require('../../model/userModel')

const path = require('path');
const easyinvoice = require('easyinvoice');
const Handlebars = require('handlebars');
const { handlebars } = require('hbs')








const myOrders = async (req, res) => {
  try {
      const userData = req.session.user
      const userId   = userData._id

      const orders = await Orders.find({ userId })
                                  .sort({ date: -1 })

      const formattedOrders = orders.map(order => {
          const formattedDate = moment(order.date).format('MMMM D, YYYY');
          return { ...order.toObject(), date: formattedDate }
      })

      console.log(formattedOrders);

      res.render('user/my_orders', {
          userData,
          myOrders: formattedOrders || [],
      })

  } catch (error) {
      console.log(error);
  }
}



const deliveredOrders = async (req, res) => {

  console.log('am from delivery ordersssssssssssssssssssssssss')
  try {

    const userData = req.session.user
    const userId   = userData._id

    const page = parseInt(req.query.page) || 1
    const perPage = 10

    const skip = (page - 1) * perPage

    const orders = await Orders.find({ userId, status: 'Delivered' })
                                .skip(skip)
                                .limit(perPage)
                                .sort({ date: -1 })

    const formattedOrders = orders.map(order => {
        const formattedDate = moment(order.date).format('MMMM D, YYYY');
        return { ...order.toObject(), date: formattedDate }
    })

    console.log(formattedOrders);

    const totalOrders = await Orders.countDocuments({ userId, status: 'Delivered' })
    const totalPages = Math.ceil(totalOrders / perPage)

    console.log(formattedOrders);
    res.render('user/canceled_orders', {
        userData,
        myOrders: formattedOrders || [],
        currentPage: page,
        totalPages,
    })

} catch (error) {
    console.log(error);
}
}


const canceledOrders = async (req, res) => {
  try {

      const userData = req.session.user
      const userId   = userData._id

      const page = parseInt(req.query.page) || 1
      const perPage = 10

      const skip = (page - 1) * perPage

      const orders = await Orders.find({ userId, status: 'Cancelled' })
                                  .skip(skip)
                                  .limit(perPage)
                                  .sort({ date: -1 })

      const formattedOrders = orders.map(order => {
          const formattedDate = moment(order.date).format('MMMM D, YYYY');
          return { ...order.toObject(), date: formattedDate }
      })

      console.log(formattedOrders);

      const totalOrders = await Orders.countDocuments({ userId, status: 'Cancelled' })
      const totalPages = Math.ceil(totalOrders / perPage)

      console.log(formattedOrders);
      res.render('user/canceled_orders', {
          userData,
          myOrders: formattedOrders || [],
          currentPage: page,
          totalPages,
      })

  } catch (error) {
      console.log(error);
  }
}


 const orderDetails = async(req, res) => {
    try {
        const userData = req.session.user
        const orderId = req.query.id

        const myOrderDetails = await Orders.findById(orderId)
        const orderedProDet  = myOrderDetails.product
        const addressId      = myOrderDetails.address

        const address        = await Address.findById(addressId)

        console.log(myOrderDetails);
       
        res.render('user/order_Details', { myOrderDetails, orderedProDet, userData, address })
    } catch (error) {
        console.log(error);
    }
 }




 const orderSuccess = (req, res) => {
    try {
        res.render('user/order_sucess')
    } catch (error) {
        console.log(error);
    }
 }


 const cancelOrder = async(req, res) => {
    try {
        const id       = req.query.id
        const userData = req.session.user
        const userId   =  userData._id
        
        const { updateWallet, payMethod } = req.body

        if(payMethod === 'wallet' || payMethod === 'razorpay'){
          await User.findByIdAndUpdate( userId, { $set:{ wallet:updateWallet }}, { new:true })
        }

        await Orders.findByIdAndUpdate(id, { $set: { status: 'Cancelled' } }, { new: true });

        res.json('sucess')
    } catch (error) {
        console.log(error);
    }
 }



 
 const returnOrder = async(req, res) => {
    try {
        const id = req.query.id

        await Orders.findByIdAndUpdate(id, { $set: { status: 'Returned' } }, { new: true });

        res.json('sucess')
    } catch (error) {
        console.log(error);
    }
 }



const getInvoice = async (req, res) => {
  try {
    const orderId = req.query.id; 
   
  

    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    const { userId, address: addressId } = order;

    const [user, address] = await Promise.all([
      User.findById(userId),
      Address.findById(addressId),
    ]);


    const products = order.product.map((product) => ({
      quantity: product.quantity.toString(),
      description: product.name,
      tax: product.tax,
      price: product.price,
    }));

    const date = moment(order.date).format('MMMM D, YYYY');
    
    


    if (!user || !address) {
      return res.status(404).send({ message: 'User or address not found' });
    }

    const filename = `invoice_${orderId}.pdf`;

    const data = {
      currency: 'USD',
      taxNotation: 'vat',
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg',
      sender: {
        company: 'Coza Store',
        address: 'Plaza Kannur',
        zip: '670320',
        city: 'Kannur',
        country: 'India',
      },
      client: {
        company: user.name,
        address: address.adressLine1,
        zip: address.pin,
        city: address.city,
        country: 'India',
      },

      information: {
        // Invoice number
        number: "2021.0001",
        // Invoice data
        date: date,
        // Invoice due date
        // duedate: "31-12-2021"
    },
  
      // invoiceNumber: '2023001',
      // invoiceDate: date,


      products: products
     
    };

easyinvoice.createInvoice(data, function (result) {

  easyinvoice.createInvoice(data, function (result) {
    const fileName = 'invoice.pdf'
    const pdfBuffer = Buffer.from(result.pdf, 'base64');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    res.send(pdfBuffer);
  })
  console.log('PDF base64 string: ');
});
} 
   
   catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};




module.exports = {
    myOrders,
    orderDetails,
    orderSuccess,
    cancelOrder, 
    getInvoice,
    returnOrder,
    deliveredOrders,
    canceledOrders, 
}