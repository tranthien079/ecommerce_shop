const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type: String,
        default: 'default_avatar.png',
    },
    role:{
        type: String,
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: '',
    },
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    usedCoupons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Coupon'
        }
    ],
    refreshToken: {
        type: String,
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationToken: String,
    verificationTokenExpires: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
    return resettoken;
  };
//Export the model
module.exports = mongoose.model('User', userSchema);