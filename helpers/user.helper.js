const nodemailer = require('nodemailer')
const argon2 = require('argon2')
const PDFDocument = require('pdfkit');
const fs = require('fs');


//Email verification

const verifyEmail = async(email)=>{
    try {
        otp = generateOtp()

       const trasporter =  nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            requireTLS: true,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        })
        
        const mailoptions = {
                from: process.env.SMTP_USER,
                to: email,
                subject: "For verify mail",
                text: otp
        }

        trasporter.sendMail(mailoptions, (error, info)=>{
          if(error){
            console.log(error);
          }else{
            console.log("Email has been sent");
          }
        })

        return otp
        
    } catch (error) {
        console.log(error);
    }
}


//gennerate otp

const generateOtp = ()=>{
     otp = `${Math.floor(1000 + Math.random() * 9000)}`
    return otp
}

//password hashing

const hashPassword = async (pasword) => {
    try {
        const passwordHash = await argon2.hash(pasword)
        return passwordHash
    } catch (error) {
        console.log(error);
        
    }
}




async function generateInvoice(order, address, user, filename) {

    const doc = new PDFDocument();
  
    const stream = doc.pipe(fs.createWriteStream(`./pdf/${filename}`)); // use a relative path
  
    doc.fontSize(25).text(`Invoice #${order._id}`, 100, 100);
    doc.moveDown();
    doc.fontSize(16).text(`Date: ${order.date}`);
    doc.moveDown();
    doc.fontSize(16).text(`Customer Information:`);
    doc.fontSize(14).text(`${user.name}`);
    doc.fontSize(14).text(`${address.adressLine1}`);
    doc.fontSize(14).text(`${address.city}, ${address.state} ${address.pin}`);
    doc.moveDown();
    doc.fontSize(16).text(`Product Information:`);
  
    let y = doc.y + 15;
    order.product.forEach((product) => {
      doc.fontSize(14).text(`Product Name: ${product.name}`, 100, y);
      doc.fontSize(14).text(`Product Price: ${product.price}`, 100, y + 20);
      doc.fontSize(14).text(`Quantity: ${product.quantity}`, 100, y + 40);
      y += 100;
    });
  
    doc.fontSize(14).text(`Total: ${order.total}`);
    doc.end();
  
    return stream;
  }
  async function generateInvoice(order, address, user, filename) {

    const doc = new PDFDocument();
  
    const stream = doc.pipe(fs.createWriteStream(`./pdf/${filename}`)); // use a relative path
  
    doc.fontSize(25).text(`Invoice #${order._id}`, 100, 100);
    doc.moveDown();
    doc.fontSize(16).text(`Date: ${order.date}`);
    doc.moveDown();
    doc.fontSize(16).text(`Customer Information:`);
    doc.fontSize(14).text(`${user.name}`);
    doc.fontSize(14).text(`${address.adressLine1}`);
    doc.fontSize(14).text(`${address.city}, ${address.state} ${address.pin}`);
    doc.moveDown();
    doc.fontSize(16).text(`Product Information:`);
  
    let y = doc.y + 15;
    order.product.forEach((product) => {
      doc.fontSize(14).text(`Product Name: ${product.name}`, 100, y);
      doc.fontSize(14).text(`Product Price: ${product.price}`, 100, y + 20);
      doc.fontSize(14).text(`Quantity: ${product.quantity}`, 100, y + 40);
      y += 100;
    });
  
    doc.fontSize(14).text(`Total: ${order.total}`);
    doc.end();
  
    return stream;
  }
    
  




module.exports = {verifyEmail, generateOtp, hashPassword, generateInvoice}