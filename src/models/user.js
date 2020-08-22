const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error('Email is invalid') 
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value ==='password'){
                throw new Error('Password cannot contain "password" ')
            }
        }
    },  
    age: {
        type: Number,
        default: 1,
        validate(value) {
            if(value <= 0){
                throw new Error('Age must greater than 0');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// Relationship with Task model
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('There is no account with this email!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('The password is incorrect')
    }

    return user

}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id : user._id.toString()}, 'XkeGwksQoPwzV1JDFs6JMZBmNU7DrD3Zg6')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// Hiding private data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

// hash password before save and update
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

// delete user task when user is deleted
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({author: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User