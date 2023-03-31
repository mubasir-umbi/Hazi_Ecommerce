// // // // const alertify = require('alertifyjs')

// // // // import alertify from 'alertifyjs';

// // // // const addToCartBtn = async (proId) => {

// // // //  alertify.set("notifier", "position", "bottom-right");
// // // //  alertify.success("Product added to cart", 3000);

// // // //  console.log('helooooooooooo');
// // // //    const response =   await fetch(`http://localhost:3000/add_to_cart?id=${proId}`, {
// // // //      method: 'GET',
// // // //      headers: {
// // // //          'Content-Type': "application/json",
// // // //       },
// // // //  })
 
// // // //  let data = await response.json()
// // // //  console.log(data, 'from add to cart btn....')
// // // // } 

// // // const addToCartButton = document.getElementById('add_to_cart_btn')

// // // addToCartButton.addEventListener("click", () => {
// // // //    alertify.set("notifier", "position", "bottom-right");
// // // //    alertify.success("Product added to cart", 3000);

// // // console.log('addto cart btn')
// // // alertify.alert('This is an alert message');

// // //     console.log('addto cart btn')
// // // })

// // // document.getElementById('username').value = 'heloooooo'

// // // // const addToCartBtn = async (proId) => {
 
// // // // }




// // // const addToCartBtn = async (proId) => {

// // // console.log('helooooooooooo');
// // // const response =   await fetch(`http://localhost:3000/add_to_cart?id=${proId}`, {
// // //  method: 'GET',
// // //  headers: {
// // //      'Content-Type': "application/json",
// // //   },
// // // })

// // // let data = await response.json()
// // // console.log(data, 'from add to cart btn....')


// // // alertify.set('notifier','position', 'bottom-center');
// // // alertify.success('Product added to cart') 
// // // }





// // // const removeFromWishlist = async (id) => {
// // //  console.log('helooooooooooo remove from wishlist')

// // //  let response = await fetch(`http://localhost:3000/remove_from_wishlist?id=${id}`,{
// // //          headers : {
// // //              "Content-Type":"application/json"
// // //          },
// // //      })

// // //      let data = await response.json()
// // //      console.log(data)
// // //      if(data){
// // //          window.location.reload('/')
// // //      }

// // //      console.log(data, 'am from add to wishlist...........//////////////////////////')
// // // }


// // html += `
// // <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" >
// //     <!-- Block2 -->
// //     <div class="block2">
// //         <div class="block2-pic hov-img0">
// //             <img src="/uploads/${product.imageUrl}" alt="IMG-PRODUCT">

// //             <a href="/productview?id=${product._id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
// //                 Quick View
// //             </a>
// //         </div>

// //         <div class="block2-txt flex-w flex-t p-t-14">
// //             <div class="block2-txt-child1 flex-col-l ">
// //                 <a href="/productview?id=${product._id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
// //                     {{this.name}}
// //                 </a>

// //                 <input type="hidden" id="name{{this._id}}" value="${product.name}">
// //                 <input type="hidden" id="id" value="${product._id}">

// //                 <span class="stext-105 cl3">
// //                     $ ${product.price}
// //                 </span>
// //             </div>

            
// //             <div class="block2-txt-child2 flex-r p-t-3">
// //                 {{!-- <a  class="btn-addwish-b2 dis-block pos-relative js-addwish-b2"> --}}
// //                     <span id="click${product._id}">
// //                         <img onclick="removeFromWishlist('${product._id}')" id="icon-1" class=" dis-block trans-04" src="images/icons/icon-heart-02.png" alt="ICON">
// //                     </span>
// //                     <span id="click${product._id}">
// //                         <img onclick="addToWishlist('${product._id}')" id="icon-2" class=" dis-block trans-04 " src="images/icons/icon-heart-01.png" alt="ICON">
// //                     </span>
                    
// //                 {{!-- </a> --}}
// //             </div>
            
// //         </div>
// //     </div>
// // </div>
// // `
// // // console.log(id)

// // // const getInvoice = async (id) => {
// // //     try {
// // //       const response = await fetch(`/get_invoice?id=${id}`);
// // //       const blob = await response.blob();
// // //       const filename = `invoice_${orderId}.pdf`;
// // //       const url = URL.createObjectURL(blob);
  
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.download = filename;
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
  
// // //       console.log('File downloaded successfully.');
// // //     } catch (error) {
// // //       console.error('Error occurred while downloading file:', error);
// // //     }
// // //   };.



// // "https://unpkg.com/easyinvoice/dist/easyinvoice.min.js"

// //     let orderId = document.getElementById('orderId').value
// //     let address = document.getElementById('address').value
// //     let products
// //     let userName = document.getElementById('userName').value
// //     let date = document.getElementById('Date').value
// //     let scheduled = document.getElementById('scheduled').value
// //     let dueDate
// //     if(scheduled == true){
// //         console.log('1--')
// //         dueDate = document.getElementById('dueDate').value
// //     }
// //     else{
// //         console.log('2')
// //         dueDate = date
// //     }
// //     console.log(address,userName,'address 217')
// //     async function invoiceData(){
// //         let data = await fetch('/invoice',{
// //             method: 'POST',
// //             headers : {
// //                 'Content-Type': 'application/json'
// //             },
// //             body : JSON.stringify({orderId}),
// //         })
// //         data = await data.json()
// //         console.log(data)
// //         products = data
        
// //     }
// //     invoiceData()
// // async function download() {
// // var data = {
// // "customize": {
// //     //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
// // },
// // "images": {
// //     // The logo on top of your invoice
// //     "logo": "https://www.seekpng.com/png/detail/275-2753863_logo-dairy-cow-logo.png",
// //     // The invoice background
// //     "background": "https://wallpaperaccess.com/full/3201890.jpg"
// // },
// // // Your own data
// // "sender": {
// //     "company": "Dairy Camp",
// //     "address": "Vidyanagar",
// //     "zip": "671123",
// //     "city": "Kasaragod",
// //     "country": "India",
// // },
// // // Your recipient
// // "client": {
// //     "company": userName,
// //     "address": address
// // },
// // "information": {
// //     // Invoice number
// //     "number": "2021.0001",
// //     // Invoice data
// //     "date": date,
// //     // Invoice due date
// //     "due-date": dueDate 
// // },
// // "products": products,
// // // The message you would like to display on the bottom of your invoice
// // //"bottom-notice": "Kindly pay your invoice within 15 days.",
// // // Settings to customize your invoice
// // "settings": {
// //     "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
// //     // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
// //     // "tax-notation": "gst", // Defaults to 'vat'
// //     // "margin-top": 25, // Defaults to '25'
// //     // "margin-right": 25, // Defaults to '25'
// //     // "margin-left": 25, // Defaults to '25'
// //     // "margin-bottom": 25, // Defaults to '25'
// //     // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
// //     // "height": "1000px", // allowed units: mm, cm, in, px
// //     // "width": "500px", // allowed units: mm, cm, in, px
// //     // "orientation": "landscape", // portrait or landscape, defaults to portrait
// // },
// // // Translate your invoice to your preferred language
// // "translate": {
// //     // "invoice": "FACTUUR",  // Default to 'INVOICE'
// //     // "number": "Nummer", // Defaults to 'Number'
// //     // "date": "Datum", // Default to 'Date'
// //     // "due-date": "Verloopdatum", // Defaults to 'Due Date'
// //     // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
// //     // "products": "Producten", // Defaults to 'Products'
// //     // "quantity": "Aantal", // Default to 'Quantity'
// //     // "price": "Prijs", // Defaults to 'Price'
// //     // "product-total": "Totaal", // Defaults to 'Total'
// //     // "total": "Totaal" // Defaults to 'Total'
// // },
// // };
// //         easyinvoice.createInvoice(data, function (result) {
// //             easyinvoice.download('myInvoice.pdf', result.pdf);
// //         });
// //     }





// //     let couponData
// //   let couponEl
// //   let newTotal
// //   let subTotal





 
// //   let paymentMethod = null;

// //   var paymentOptionCheckboxes = document.querySelectorAll('input[name="payment_option"]');

// // paymentOptionCheckboxes.forEach(function(checkbox) {
// //   checkbox.addEventListener('change', function() {
// //     if (checkbox.checked) {
// //       paymentMethod = checkbox.value
// //       console.log("User selected " + checkbox.value);
// //     } else {
// //       console.log("User unchecked " + checkbox.value);
// //     }
// //   });
// // });


// //   function handleCheckboxChange() {
// //     cashOnDelivery.checked ? paymentMethod = 'cash-on-delivery' : paymentMethod = 'razorpay'
// //   }



// //   const placeOrder = () => {
// //     paymentMethod == 'cash-on-delivery' ? Cod() : online()
// //   }


// //   const Cod = async () => {
// //     const selectAddress = document.querySelector('#selectedAddress').value
// //     const subTotal = Number(document.getElementsByName('subTotal')[0].value)

// //     const datas = await fetch('/place_order', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': "application/json",
// //       },

// //       body: JSON.stringify({

// //         selectedAddress: selectAddress,
// //         selectedPayment: paymentMethod,
// //         amount: subTotal,
// //         couponData: couponData,
// //         couponName: couponEl
// //       })
// //     })

// //     const placeOrderData = await datas.json()

// //     if (placeOrderData) {
// //       window.location.href = '/order_sucess'
// //     }
// //   }

// //   const online = () => {
// //     subTotal = Number(document.getElementsByName('subTotal')[0].value)


// //     var options = {
// //       "key": "rzp_test_6u4aUWyjD4kZvI", // Enter the Key ID generated from the Dashboard
// //       "amount": subTotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
// //       "currency": "INR",

// //       /*"name": "Acme Corp", //your business name
// //       "description": "Test Transaction",
// //       "image": "https://example.com/your_logo",*/

// //       "order_id": undefined, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
// //       "handler": function (response) {
// //         Cod()
// //       },

// //     };
// //     var rzp1 = new Razorpay(options);
// //     rzp1.open();

// //   }




// //   let couponStatus

// //   const validateCoupon = async () => {
// //     couponEl = document.getElementById('copon').value
// //     subTotal = Number(document.getElementsByName('subTotal')[0].value)

// //     console.log(couponEl)

// //     console.log('heloooo from validate coupon...............')
// //     const response = await fetch('/validate_coupon', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': "application/json",
// //       },

// //       body: JSON.stringify({
// //         couponVal: couponEl,
// //         subTotal: subTotal

// //       })
// //     })


// //     console.log('hiiiii from coupon status........;;;;;;')
// //     couponData = await response.json()
// //     console.log(couponData)

// //     const setCouponStatus = (msg, id) => {

// //       id.innerHTML = `<p>${msg}</p>`

// //       setTimeout(() => {
// //         id.style.opacity = 0
// //         id.style.innerText = ''
// //       }, 5000)
// //     }


// //     const coponMsg = document.getElementById('couponMsg')
// //     const sCoponMsg = document.getElementById('sCoponMsg')

// //     if (couponData === 'invalid') {
// //       setCouponStatus('Invalid coupon', coponMsg)
// //     }
// //     else if (couponData === 'alredy used') {
// //       setCouponStatus('Coupon alredy used', coponMsg)
// //     }

// //     if (couponData.sucess === 'sucess') {
// //       setCouponStatus('Coupon applied successfuly', sCoponMsg)

// //       subTotal = Number(document.getElementById('new_sub_total').innerHTML = `<strong >$${couponData.newTotal}</strong>`)
// //       document.getElementById('copoun_code').innerHTML = `<small>${couponEl}</small>`
// //       document.getElementById('discount_amt').innerHTML = `<span class="text-success">-$${couponData.discountAmt}</span>`

// //     }
// //   }













// //   {
// //     {
// //       !--document.getElementById('rzp-button1').onclick = async function (e) {
// //         e.preventDefault();


// //         console.log('from razorrrrrrrrrrrrrrrrrrrrrr')
// //         const response = await fetch('http://localhost:3000/place_order', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': "application/json",
// //           },

// //           body: JSON.stringify({
// //             amount: 500,

// //           })
// //         })

// //         let orderData = await response.json()

// //         var options = {
// //           "key": "rzp_test_6u4aUWyjD4kZvI", // Enter the Key ID generated from the Dashboard
// //           "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
// //           "currency": "INR",

// //           /*"name": "Acme Corp", //your business name
// //           "description": "Test Transaction",
// //           "image": "https://example.com/your_logo",*/

// //           "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
// //           "handler": function (response) {
// //             alert(response.razorpay_payment_id);
// //             alert(response.razorpay_order_id);
// //             alert(response.razorpay_signature)
// //           },

// //         };
// //         var rzp1 = new Razorpay(options);
// //         rzp1.open();
// //       } --}
// //   }





// //   /*rzp1.on('payment.failed', function (response){
// //           alert(response.error.code);
// //           alert(response.error.description);
// //           alert(response.error.source);
// //           alert(response.error.step);
// //           alert(response.error.reason);
// //           alert(response.error.metadata.order_id);
// //           alert(response.error.metadata.payment_id);
// //   });*/




// var paymentOptionCheckboxes = document.querySelectorAll('input[name="payment_option"]');

// let paymentMethod = null; 

// paymentOptionCheckboxes.forEach(function(checkbox) {
//   checkbox.addEventListener('change', function() {
//     if (checkbox.checked) {
//       paymentMethod = checkbox.value
//       console.log("User selected " + checkbox.value);
//       console.log(paymentMethod, 'payment method..........')
//     } else {
//       console.log("User unchecked " + checkbox.value);
//     }
//   });
// });



  



//   /* function handleCheckboxChange() {
//     cashOnDelivery.checked ? paymentMethod = 'cash-on-delivery' : paymentMethod = 'razorpay'
//       console.log(paymentMethod)
//   } */



//  /* const placeOrder = () => {
//     paymentMethod == 'cash-on-delivery' ? Cod() : online()
//   }*/

//   const placeOrder = () => {
//   if (paymentMethod === 'cash-on-delivery') {
//     Cod()
//   } else if (paymentMethod === 'online') {
//     online()
//   } else if (paymentMethod === 'wallet') {
//     useWallet()
//   } else {
//     console.log('Invalid payment method.')
//   }
// }


// const useWallet =() => {
//   cod()
// }



//   const Cod = async () => {
//     const selectAddress = document.querySelector('#selectedAddress').value
//     const subTotal = Number(document.getElementsByName('subTotal')[0].value)

//     const datas = await fetch('/place_order', {
//       method: 'POST',
//       headers: {
//         'Content-Type': "application/json",
//       },

//       body: JSON.stringify({

//         selectedAddress: selectAddress,
//         selectedPayment: paymentMethod,
//         amount: subTotal,
//         couponData: couponData,
//         couponName: couponEl
//       })
//     })

//     const placeOrderData = await datas.json()

//     if (placeOrderData) {
//       window.location.href = '/order_sucess'
//     }
//   }

//   const online = () => {
//     subTotal = Number(document.getElementsByName('subTotal')[0].value)


//     var options = {
//       "key": "rzp_test_6u4aUWyjD4kZvI", // Enter the Key ID generated from the Dashboard
//       "amount": subTotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       "currency": "INR",

//       /*"name": "Acme Corp", //your business name
//       "description": "Test Transaction",
//       "image": "https://example.com/your_logo",*/

//       "order_id": undefined, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       "handler": function (response) {
//         Cod()
//       },

//     };
//     var rzp1 = new Razorpay(options);
//     rzp1.open();

//   }




//   let couponStatus

//   const validateCoupon = async () => {
//     couponEl = document.getElementById('copon').value
//     subTotal = Number(document.getElementsByName('subTotal')[0].value)

//     console.log(couponEl)

//     console.log('heloooo from validate coupon...............')
//     const response = await fetch('/validate_coupon', {
//       method: 'POST',
//       headers: {
//         'Content-Type': "application/json",
//       },

//       body: JSON.stringify({
//         couponVal: couponEl,
//         subTotal: subTotal

//       })
//     })


//     console.log('hiiiii from coupon status........;;;;;;')
//     couponData = await response.json()
//     console.log(couponData)

//     const setCouponStatus = (msg, id) => {

//       id.innerHTML = `<p>${msg}</p>`

//       setTimeout(() => {
//         id.style.opacity = 0
//         id.style.innerText = ''
//       }, 5000)
//     }


//     const coponMsg = document.getElementById('couponMsg')
//     const sCoponMsg = document.getElementById('sCoponMsg')

//     if (couponData === 'invalid') {
//       setCouponStatus('Invalid coupon', coponMsg)
//     }
//     else if (couponData === 'alredy used') {
//       setCouponStatus('Coupon alredy used', coponMsg)
//     }

//     if (couponData.sucess === 'sucess') {
//       setCouponStatus('Coupon applied successfuly', sCoponMsg)

//       subTotal = Number(document.getElementById('new_sub_total').innerHTML = `<strong >$${couponData.newTotal}</strong>`)
//       document.getElementById('copoun_code').innerHTML = `<small>${couponEl}</small>`
//       document.getElementById('discount_amt').innerHTML = `<span class="text-success">-$${couponData.discountAmt}</span>`

//     }
//   }




  

//   <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
//      <div class="block2">
//         <div class="block2-pic hov-img0">
//           <img src="/uploads/${product.imageUrl[0]}" alt="IMG-PRODUCT">
//           <a href="/productview?id=${product._id}"
//             class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04">Quick View</a>
//         </div>
//         <div class="block2-txt flex-w flex-t p-t-14">
//           <div class="block2-txt-child1 flex-col-l">
//             <a href="/productview?id=${product._id}"
//               class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">${product.name}</a>
//             <input type="hidden" id="name${product._id}}" value="${product.name}">
//             <input type="hidden" id="id" value="${product._id}">
//             <span class="stext-105 cl3">$ ${product.price}</span>
//           </div>
//           <div class="block2-txt-child2 flex-r p-t-3">
//             {{#if isWishlisted}}
//               <span id="click${product._id}">
//                 <img onclick="removeFromWishlist('${product._id}')" id="icon-1" class="dis-block trans-04"
//                   src="images/icons/icon-heart-02.png" alt="ICON">
//               </span>
//             {{else}}
//               <span id="click${product._id}">
//                 <img onclick="addToWishlist('${product._id}')" id="icon-2" class="dis-block trans-04"
//                   src="images/icons/icon-heart-01.png" alt="ICON">
//               </span>
//            {{/if}}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div> `



