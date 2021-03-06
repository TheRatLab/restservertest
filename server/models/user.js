const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    mail: {
        type: String,
        unique: true,
        required: [true, 'The mail is required']
    },
    password: {
        type: String,
        required: [true, 'password is requiered']
    },
    img: {
        type: String,
        requiered: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} needs to be unique' })

module.exports = mongoose.model('User', userSchema);