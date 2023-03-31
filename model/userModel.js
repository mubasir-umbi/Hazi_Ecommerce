const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobile:{
        type: Number,
        required: true
    },

    password:{
        type: String,
        required: true
    }, 

    isVerified:{
        type: Boolean,
        required: true
    },

    isBlocked:{
        type: Boolean,
        required: true,
    },

    cart:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity:{
                type: Number, 
                default: 1
            }      
        }
    ],
 
    wishlist:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    ],

    wallet:{
        type: Number,
        default: 0
    },
    
})




module.exports = mongoose.model('User', userSchema)