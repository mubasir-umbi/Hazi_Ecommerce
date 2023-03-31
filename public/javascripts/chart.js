// const moment = require('moment');
// const Sale = require('../../model/order');

// const getChartData = async (req, res) => {

// try {
//  await Sale.find({}, (err, sales) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(sales,'salessssssssssssssssss');
  
//   const salesByMonth = {};
  
//   sales.forEach((sale) => {
//     const monthYear = moment(sale.date).format('MMMM YYYY');
//     if (!salesByMonth[monthYear]) {
//       salesByMonth[monthYear] = {
//         totalOrders: 0,
//         totalRevenue: 0
//       };
//     }
//     salesByMonth[monthYear].totalOrders += 1;
//     salesByMonth[monthYear].totalRevenue += sale.total;
//   });
  
//   const chartData = [];
  
//   Object.keys(salesByMonth).forEach((monthYear) => {
//     const { totalOrders, totalRevenue } = salesByMonth[monthYear];
//     chartData.push({
//       month: monthYear.split(' ')[0],
//       totalOrders: totalOrders || 0,
//       totalRevenue: totalRevenue || 0
//     });
//   });
  
//   console.log(chartData);
  
//   let months        = []
//   let odersByMonth  = []
//   let revnueByMonth = []
//   let totalRevnue = 0
//   let totalSales  = 0



//   chartData.forEach((data) => {
//     months.push(data.month)
//     odersByMonth.push(data.totalOrders)
//     revnueByMonth.push(data.totalRevenue)
//     totalRevnue += Number(data.totalRevenue)
//     totalSales  += Number(data.totalOrders)
//   })

//   console.log(months);
//   console.log(odersByMonth);
//   console.log(revnueByMonth);
//   console.log(totalRevnue);
//   console.log(totalSales);
  
// });


// } catch (error) {
//   console.log(error);
// }

// }


const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate());
const maxDate = tomorrow.toISOString().split('T')[0];

// {{!-- document.getElementById("start-date").setAttribute("min", today) --}}
document.getElementById("start-date").setAttribute("max", maxDate);
document.getElementById("end-date").setAttribute("min", today)
document.getElementById("end-date").setAttribute("max", maxDate);

// Ensure end date is greater than start date
var startDateField = document.getElementById("start-date");
var endDateField = document.getElementById("end-date");

startDateField.addEventListener("change", function () {
    endDateField.setAttribute("min", startDateField.value);
});

endDateField.addEventListener("change", function () {
    startDateField.setAttribute("max", endDateField.value);
});


const getSalesData = async() => {
const startDate = document.getElementById('start-date').value
const endDate =document.getElementById('end-date').value
 console.log(startDate, endDate) 



 Handlebars.registerHelper("for", function(from, to, incr, block) {
  var accum = '';
  for(var i = from; i < to; i += incr)
      accum += block.fn(i);
  return accum;
});



 // Define Handlebars template
const salesReportTemplate = `
<div class="col-xl-12">
  <!-- Account details card-->
  <div class="card mb-4">
    <div class="card-header">Sales Report 

    </div>

    <div class="card-body ml-3 p-5">
      <ul>   
        <table id="my-table" class="my-table table table-hover" style="border-top: 1px solid black;">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Order id</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Product Details</th>
              <th scope="col">Total</th>
              
            </tr>
          </thead>
          <tbody>
            {{#each data.orders}}
            <tr>
              <td>{{this.date}}</td>
              <td>{{this.orderId}}</td>
              <td>{{this.payMethod}}</td> 
              <td>
                 {{#each this.proName}}
                 <p>Name: {{this.name}}</p>
                 <p>Quantity: {{this.quantity}}</p>
                 <p>Price: <span>$</span>{{this.price}}</p>
                 {{/each}}
                 </td> 
            
              <td><span>$</span>{{total}}</td> 
            </tr>
            {{/each}} 
          </tbody>
        </table>
                
        <h5>Total Revenue: $<strong class="ml-auto">{{data.grandTotal}}</strong>  </h5>
       
      </ul>
    </div>
  </div>
</div>
`;




// Define function to render template with data
function renderSalesReport(data) {
  const compiledTemplate = Handlebars.compile(salesReportTemplate);
  const salesReportHTML = compiledTemplate({ data: data });
  document.getElementById('table').innerHTML = salesReportHTML

  $(document).ready( function () {
    $('#my-table').DataTable({
      dom: 'Bfrtip',
          buttons: [
              'excelHtml5',
              'pdfHtml5'
      ]
    });
  } );
}


 const response = await fetch(`/admin/get_sales?stDate=${startDate}&edDate=${endDate}`, {
    headers: { 'Content-Type': "application/json" },
 })

   const data = await response.json() 
   console.log(data)

   if (data) {
    console.log(data.orders);
    
    renderSalesReport(data);
  }
}
























