const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    admin: { type: Boolean, required: false, default: false},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    height: { type: String, required: false, default: 'no response' },
    weight: { type: String, required: false, default: 'no response' },
    gender: { type: String, required: false, default: 'no response' },
    dob: { type: String, required: false, default: 'no response' },
    medicalConditions: { type: String, required: false, default: 'no response' },
    familyHistory: { type: String, required: false, default: 'no response' },
    personalHistory: { type: String, required: false, default: 'no response' },
    fitnessGoals: { type: String, required: false, default: 'no response' },
    activityLevel: { type: String, required: false, default: 'no response' },
    exercisePlan: { type: String, required: false, default: 'no response' },
    gymEquipment: { type: String, required: false, default: 'no response' },
    videoFilterPreferences: { type: Object, required: false, default: {}},
    paymentComplete: { type: Boolean, required: true, default: false },
    paymentRefNumber: { type: String, required: false, default: 'n/a'},
    paymentTxnId: { type: String, required: false, default: 'n/a'},
    paymentDate: { type: String, required: false, default: 'n/a' },
    waiverSigned: { type: Boolean, required: true, default: false },
    signUpDate: {type: Date, required: true, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
};

userSchema.pre('save', function (next) {

    // HASH PASSWORD WHEN NEW USER CREATED
    if (!this.password) {
        console.log('models/user.js ***NO PASSWORD PROVIDED***')
        next()
    } else {
        console.log('models/user.js hashPassword in pre-save')
        this.password = this.hashPassword(this.password)
        next()
    }
});

userSchema.pre('findOneAndUpdate', function (next) {

    // HASH PASSWORD IF MODIFIED
    const password = this.getUpdate().$set.password;
        if (!password) {
            return next();
        }
        try {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);
            this.getUpdate().$set.password = hash;
            next();
        } catch (error) {
            return next(error);
        }

});

// userSchema.pre('save', function (next) {
//     var user = this;
//     var SALT_FACTOR = 5;

//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//         if (err) return next(err);

//         bcrypt.hash(user.password, salt, null, function(err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//         });
//     });
    
//     // if (!this.password) {
//     //     console.log('models/user.js ***NO PASSWORD PROVIDED***')
//     //     next()
//     // } else {
//     //     console.log('models/user.js hashPassword in pre-save')
//     //     this.password = this.hashPassword(this.password)
//     //     next()
//     // }
// });

const User = mongoose.model('User', userSchema)

module.exports = User;