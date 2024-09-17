const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const Pet = require('./Pet');
const Order = require('./Order');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    pets: [Pet.schema],

    orders: [Order.schema]

});


userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };


const User = mongoose.model('User', userSchema);

module.exports = User;