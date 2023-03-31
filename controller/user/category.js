const Product  = require('../../model/productModel')
const Category = require('../../model/categoryModel')

const catFilter = async(req, res)=>{
    try {
        const id       = req.query.id
            
        const productData = await Product.find({ category: id, is_blocked:false })
        res.json( productData )
    } catch (error) {
        console.log(error);
    }   
}


const categoryFilter = async(req, res)=>{
    try {
        const id       = req.query.id
        const catData  = await Category.find()
        const productData = await Product.find({ category: id, is_blocked:false })
        res.render( 'user/category', {productData, catData})
    } catch (error) {
        console.log(error);
    }   
}



const loadWomCat = async(req, res)=>{
    try {
        id = req.query.id   

        const womenData = await Product.find({category: id, is_blocked:false})
        if (req.session.user) {
            res.render('user/women_cat',{womenData, userData})
        }else{
            res.render('user/women_cat',{womenData})
        }
    } catch (error) {
        console.log(error);
    }   
}





module.exports = {
    catFilter,
    loadWomCat,
    categoryFilter,

}