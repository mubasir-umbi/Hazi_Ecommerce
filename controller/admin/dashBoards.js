const moment = require('moment');
const Sale = require('../../model/order')
const Order = require('../../model/order');
const PDFDocument = require('pdfkit')
const hbs = require('hbs')

let months        = []
let odersByMonth  = []
let revnueByMonth = []
let totalRevnue = 0
let totalSales  = 0


hbs.registerHelper("json", function (context) {
    return JSON.stringify(context)
  })


const loadDashboard = async(req, res) => {
       
    Sale.find({}, (err, sales) => {
      if (err) {
        console.error(err);
        return;
      }
    
      console.log(sales,'salessssssssssssssssss');
      
      const salesByMonth = {};
      
      sales.forEach((sale) => {
        const monthYear = moment(sale.date).format('MMMM YYYY');
        if (!salesByMonth[monthYear]) {
          salesByMonth[monthYear] = {
            totalOrders: 0,
            totalRevenue: 0
          };
        }
        salesByMonth[monthYear].totalOrders += 1;
        salesByMonth[monthYear].totalRevenue += sale.total;
      });
      
      const chartData = [];
      
      Object.keys(salesByMonth).forEach((monthYear) => {
        const { totalOrders, totalRevenue } = salesByMonth[monthYear];
        chartData.push({
          month: monthYear.split(' ')[0],
          totalOrders: totalOrders || 0,
          totalRevenue: totalRevenue || 0
        });
      });
      
      console.log(chartData);
      
       months        = []
       odersByMonth  = []
       revnueByMonth = []
       totalRevnue = 0
       totalSales  = 0



      chartData.forEach((data) => {
        months.push(data.month)
        odersByMonth.push(data.totalOrders)
        revnueByMonth.push(data.totalRevenue)
        totalRevnue += Number(data.totalRevenue)
        totalSales  += Number(data.totalOrders)
      })

      const thisMonthOrder = odersByMonth[odersByMonth.length-1]
      const thisMonthSales = revnueByMonth[revnueByMonth.length-1]

      console.log(thisMonthOrder, thisMonthSales);


    //   const data = {
    //     months: months,
    //     ordersByMonth: odersByMonth,
    //     revenueByMonth: revnueByMonth,
       
    //   };
      
    //   const jsonData = JSON.stringify(data);
      

      console.log(months);
      console.log(odersByMonth);
      console.log(revnueByMonth);
      console.log(totalRevnue);
      console.log(totalSales);

      res.render('admin/home', { revnueByMonth, months, odersByMonth, totalRevnue, totalSales, thisMonthOrder, thisMonthSales})

    })
    
}








 const getSales = async (req, res) => {
    const { stDate, edDate } = req.query
    console.log(stDate, edDate)
    
    const startDate = new Date(stDate);
    const endDate = new Date(edDate);
    
    const orders = await Order.find({
        date: {
            $gte: startDate,
            $lte: endDate,
        },
        status: 'Delivered' // Filter by status
    })
        .sort({ date: 'desc' });
    
    const formattedOrders = orders.map((order) => ({
        date: moment(order.date).format('YYYY-MM-DD'),
        ...order
    }))
    
    console.log(formattedOrders);
    
    let salesData = []
    
    formattedOrders.forEach((element) => {
        salesData.push({
            date: element.date,
            orderId: element._doc.orderId,
            total: element._doc.total,
            payMethod: element._doc.paymentMethod,
            proName: element._doc.product,
        })
    })
    
    
    let grandTotal = 0
    
    salesData.forEach(element => {
        grandTotal += element.total
    })
    
    console.log(grandTotal);
    
    res.json({
        grandTotal: grandTotal,
        orders: salesData,
    });
    

 }



 const getChartData = (req, res) => {
    try {
        res.json({
            months: months,
            revnueByMonth: revnueByMonth,
            odersByMonth : odersByMonth
        })
    } catch (error) {
        
    }
 }




module.exports = {
    loadDashboard,
    // currentMonthOrder,
    getSales,
    getChartData,
}