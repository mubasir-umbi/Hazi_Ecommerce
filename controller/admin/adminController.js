const Admin       = require("../../model/adminModel");
const adminHelper = require("../../helpers/admin_helper");
const User        = require("../../model/userModel");
const Category    = require("../../model/categoryModel");
const Product     = require("../../model/productModel");
const Coupon      = require("../../model/coupon");
const Orders      = require("../../model/order");
const Address     = require("../../model/address");
const Banner      = require('../../model/banner')
const moment      = require("moment");

let adminData;
let catSaveMsg = "Category added suceessfully..!!";

///Admin home page ///

const adminLogin = (req, res) => {
  res.render("admin/login");
};

/////Admin Login//////

const adminDoLogin = async (req, res) => {
  try {
    let adminEmail = req.body.email;
    let adminPassword = req.body.password;

    console.log(req.body);

    adminData = await Admin.findOne({ email: adminEmail });
    console.log(adminData);

    if (adminData) {
      if (adminPassword === adminData.password) {
        req.session.aLoggedIn = true;
        req.session.admin = adminData;
        res.redirect("/admin/home");
      } else {
        res.render("admin/login", { message: "incorrect email or password" });
      }
    } else {
      res.render("admin/login", { message: "incorrect email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};

///Admin logout ////////////////

const adminLogout = async (req, res) => {
  try {
    req.session.destroy();
    adminData = null;
    res.redirect("/admin/login");
  } catch (error) {
    console.log(error.message);
  }
};


///Get home page////////////


const loadHome = (req, res) => {
  try {
    res.render("admin/home");
  } catch (error) {
    console.log(error);
  }
};


//Get all users data///////////////

const loadUsersData = async (req, res) => {
  try {
    let allUsersData = await adminHelper.getAllUsersData();
    res.render("admin/manage_users", { allUsersData });
  } catch (error) {
    console.log(error);
  }
};



const blockUser = async (req, res) => {
  try {
    let id = req.params.id;

    const blockUser = await User.findById(id);
    let isBlocked = blockUser.isBlocked;

    const usrData = await User.findByIdAndUpdate(
      id,
      { $set: { isBlocked: !isBlocked } },
      { new: true }
    );

    res.redirect("/admin/manage_users");
  } catch (error) {
    console.log(error);
  }
};

/// To get category page ///

const getCategory = async (req, res) => {
  try {
    let allCtegoryData = await adminHelper.getAllCtegoryData();
    let catUpdtMsg = "Category updated successfully..!!";

    if (req.session.categoryUpdate) {
      res.render("admin/category", { allCtegoryData, catUpdtMsg });
      req.session.categoryUpdate = false;
    } else {
      res.render("admin/category", { allCtegoryData });
    }
  } catch (error) {
    console.log(error);
  }
};

/// To get add category page ///

const addCategory = (req, res) => {
  try {
    let catExistMsg = "Category alredy Exist..!!";

    if (req.session.categorySave) {
      res.render("admin/add_category", { catSaveMsg });
      req.session.categorySave = false;
    } else if (req.session.catExist) {
      res.render("admin/add_category", { catExistMsg });
      req.session.catExist = false;
    } else {
      res.render("admin/add_category");
    }
  } catch (error) {
    console.log(error);
  }
};

/// To add new category post///

const addNewCategory = async (req, res) => {
  const catName = req.body.name;
  const image = req.file;
  const lCatName = catName.toLowerCase();

  try {
    const catExist = await Category.findOne({ category: lCatName });
    if (!catExist) {
      const category = new Category({
        category: lCatName,
        imageUrl: image.filename,
      });

      await category.save();
      req.session.categorySave = true;
      res.redirect("/admin/add_category");
    } else {
      req.session.catExist = true;
      res.redirect("/admin/add_category");
    }
  } catch (error) {}
};

/// To edit category ///

const editCategory = async (req, res) => {
  let catId = req.params.id;

  try {
    const catData = await Category.findById({ _id: catId });

    if (req.session.catExist) {
      res.render("admin/edit_category", { catData, catExistMsg });
      // req.session.catExist = false
    } else {
      res.render("admin/edit_category", { catData });
    }
  } catch (error) {
    console.log(error);
  }
};

/// To update Category post///

const updateCategory = async (req, res) => {
  try {
    const catName = req.body.name;
    const image = req.file;
    const catId = req.params.id;

    const cat = await Category.findById(catId);
    const catImg = cat.imageUrl;
    let updImge;

    if (image) {
      updImge = image.filename;
    } else {
      updImge = catImg;
    }


    const catExist = await Category.findOne({ category: catName });
    console.log(catExist);

    if (!catExist) {
      await Category.findByIdAndUpdate(
        catId,
        {
          category: req.body.name,
          imageUrl: updImge,
        },
        { new: true }
      );

      req.session.categoryUpdate = true;
      res.redirect("/admin/category");
    } else {
      // req.session.catExist = true
      res.redirect("/admin/category");
    }
  } catch (error) {}
};

/// To delete category ///

const deleteCategory = async (req, res) => {
  let catId = req.params.id;

  try {
    await Category.findByIdAndDelete(catId);
    res.redirect("/admin/category");
  } catch (error) {
    console.log(error);
  }
};

// load product ///////////

const getProduct = async (req, res) => {
  try {

    const productData = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
    ]);

    res.render("admin/products", { productData });
  } catch (error) {
    console.log(error);
  }
};

////// new Product page/////////////


const newProduct = async (req, res) => {
  try {
    let productSaveMsg = "Product added successfuly..!!";

    const catogories = await Category.find();
    console.log(catogories);

    if (req.session.productSave) {
      res.render("admin/addproduct", { productSaveMsg, catogories });
      req.session.productSave = false;
    } else {
      res.render("admin/addproduct", { catogories });
    }
  } catch (error) {
    console.log(error);
  }
};

//To get orders page ///


// const getOrders = async (req, res) => {
//   try {
//     const orders = await Orders.find();

//     const now = moment();

//     const ordersData = orders.map((order) => {
//       const formattedDate = moment(order.date).format("MMMM D, YYYY");

//       return {
//         ...order,
//         date: formattedDate,
//       };
//     });

//     ordersData.reverse();

//     console.log(ordersData);

//     res.render("admin/orders", { ordersData });
//   } catch (error) {
//     console.log(error);
//   }
// };




const getOrders = async (req, res) => {
  try {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * PAGE_SIZE;

    const orders = await Orders.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(PAGE_SIZE);

    const now = moment();

    const ordersData = orders.map((order) => {
      const formattedDate = moment(order.date).format("MMMM D, YYYY");

      return {
        ...order.toObject(),
        date: formattedDate,
      };
    });

    console.log(ordersData);

    res.render("admin/orders", {
      ordersData,
      currentPage: page,
      totalPages: Math.ceil(await Orders.countDocuments() / PAGE_SIZE),
    });
  } catch (error) {
    console.log(error);
  }
};


////// Add new Product post/////////////

const addNewProduct = async (req, res) => {
  try {
    const files = req.files;
    const images = [];

    files.forEach((file) => {
      const image = file.filename;
      images.push(image);
    });
    const { name, price, description, category, stock } = req.body;
    const product = new Product({
      name        : name,
      price       : price,
      description : description,
      category    : category,
      stock       : stock,
      imageUrl    : images,
    });

    await product.save();
    req.session.productSave = true;
    res.redirect("/admin/new_product");
  } catch (error) {
    console.log(error);
  }
};

/// To edit Product ///

const editProduct = async (req, res) => {
  try {
    let proId = req.params.id;
    
    const proData = await Product.findById({ _id: proId })
    const catogories = await Category.find()

    res.render("admin/edit_product", { proData, catogories })
  } catch (error) {
    console.log(error);
  }
};

/// To update Product post///

const updateProduct = async (req, res) => {
  try {
    const proId   = req.params.id;
    const product = await Product.findById(proId);
    const exImage = product.imageUrl;
    const files   = req.files;
    let updImages = [];

    if (files && files.length > 0) {
      const newImages = req.files.map((file) => file.filename);
      updImages = [...exImage, ...newImages];
      product.imageUrl = updImages;
    } else {
      updImages = exImage;
    }

    const { name, price, description, category, stock } = req.body;
    await Product.findByIdAndUpdate(
      proId,
      {
        name        : name,
        price       : price,
        description : description,
        category    : category,
        stock       : stock,
        is_blocked  : false,

        imageUrl    : updImages,
      },
      { new: true }
    );

    // req.session.productSave = true
    res.redirect("/admin/product");
  } catch (error) {
    console.log(error);
  }
};

/// To delete Product ///

const deleteProduct = async (req, res) => {
  const proId = req.params.id;
  const prodData = await Product.findById(proId);
  const isBlocked = prodData.is_blocked;

  const proData = await Product.findByIdAndUpdate(
    proId,
    { $set: { is_blocked: !isBlocked } },
    { new: true }
  );
  console.log(prodData.is_blocked);

  res.redirect("/admin/product");
  req.session.proDelete = true;
};

const loadCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.find();

    const now = moment();

    const couponData = coupon.map((cpn) => {
      const formattedDate = moment(cpn.expiryDate).format("MMMM D, YYYY");

      return {
        ...cpn,
        expiryDate: formattedDate,
      };
    });

    console.log(couponData);
    res.render("admin/coupon", { couponData });
  } catch (error) {
    console.log(error);
  }
};

const addCoupon = (req, res) => {
  try {
    const couponMsg = "Coupon added successfuly..!!";
    const couponExMsg = "Coupon alredy exist..!!";

    if (req.session.coupon) {
      res.render("admin/add_coupon", { couponMsg });
      req.session.coupon = false;
    } else if (req.session.exCoupon) {
      res.render("admin/add_coupon", { couponExMsg });
      req.session.exCoupon = false;
    } else {
      res.render("admin/add_coupon");
    }
  } catch (error) {
    console.log(error);
  }
};

const addCouponPost = async (req, res) => {
  try {
    const { code, percent, expDate } = req.body;

    const cpnExist = await Coupon.findOne({ code: code });

    if (!cpnExist) {
      const coupon = new Coupon({
        code: code,
        discount: percent,
        expiryDate: expDate,
      });

      await coupon.save();
      req.session.coupon = true;
      res.redirect("/admin/add_coupon");
    } else {
      req.session.exCoupon = true;
      res.redirect("/admin/add_coupon");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const id = req.query.id;

    await Coupon.findByIdAndDelete(id);

    res.redirect("/admin/coupons");
  } catch (error) {
    console.log(error);
  }
};

const orderDetails = async (req, res) => {
  try {
    const userData = req.session.user;
    const orderId = req.query.id;

    const myOrderDetails = await Orders.findById(orderId);
    const orderedProDet = myOrderDetails.product;
    const addressId = myOrderDetails.address;

    const address = await Address.findById(addressId);

    res.render("admin/order_Details", {
      myOrderDetails,
      orderedProDet,
      userData,
      address,
    });
  } catch (error) {
    console.log(error);
  }
};

const changeOrderStatus = async (req, res) => {
  console.log(req.body);

  try {
    const id = req.query.id;
    const status = req.body.status;

    const order = await Orders.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
    res.redirect("/admin/orders");
  } catch (error) {
    console.log(error);
  }
};



const deleteProdImage =  async (req, res) => {
  try {

    console.log('hiii am from delete imageeeeeeeeeeeee');
    const { id, image } = req.query
    const product = await Product.findById(id);

    product.imageUrl.splice(image, 1);

    await product.save();

    res.status(200).send({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


const loadBanner = async (req, res) => {
  try {
    
    const bannerData = await Banner.find()
    console.log(bannerData);
    res.render('admin/banners' , {bannerData})
  } catch (error) {
    console.log(error)
  }
}

const addBanner =  (req, res) => {
  try {
   
    res.render('admin/add_banner', {bannerData})
  } catch (error) {
    console.log(error);
  }
}


const addBannerPost = async (req, res) => {
  try {
    console.log(req.body, 'bannerrrrrrrrrrrrrrrrrr')
    console.log(req.file);
    const {title, link} = req.body
    const image  = req.file.filename 
    console.log(image);

    const banner = new Banner ({
      title : title,
      image : image,
      link  : link,
    })

    await banner.save()
  } catch (error) { 
    console.log(error)
  }
}



const deleteBanner = async (req, res) => {
  try {
    const id = req.query.id;

    await Coupon.findByIdAndDelete(id);

    res.redirect("/admin/banners");
  } catch (error) {
    console.log(error);
  }
};




module.exports = {
  adminLogin,
  adminDoLogin,
  loadHome,
  adminLogout,
  blockUser,
  loadUsersData,

  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  addNewCategory,
  updateCategory,

  getProduct,
  addNewProduct,
  newProduct,
  editProduct,
  deleteProduct,
  updateProduct,
  deleteProdImage,

  getOrders,
  orderDetails,

  loadCoupon,
  addCoupon,
  addCouponPost,
  deleteCoupon,

  changeOrderStatus,

  loadBanner,
  addBanner,
  addBannerPost,
  deleteBanner,
};
