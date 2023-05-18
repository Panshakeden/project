const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'please add a name']
    },

    email: {
        type: String,
        required: [true,'please enter an email'],
        unique: true
    },

    password: {
        type: String,
        required: [true,'please add a password']
    },

    
},{
    timestamp: true
})


module.exports= mongoose.model('User', userSchema)
