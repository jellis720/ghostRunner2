const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: {type: String, required: true},
  providerId: { type: String },
  passwordHash: { type: String }
});

userSchema.plugin(findOrCreate);

userSchema.methods.setPassword = function(password) {
  this.passwordHash = bcrypt.hashSync(password, 8);
};

//individual users can authenticate their passwordHash
userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.passwordHash);
};

//static method to authenticate user
userSchema.statics.authenticate = function(username, password){
  return(
    User.findOne({ username: username })
    //validate the user's password
    .then(user => {
      if (user && user.validatePassword(password)) {
        return user;
      } else {
        return null;
      }
    })
  );
};

//create a model for a User
const User = mongoose.model('User', userSchema);

module.exports = User;
