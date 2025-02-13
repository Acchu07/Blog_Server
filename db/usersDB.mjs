import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'UserName where?'],
    },
    password: {
        type: String,
        required: true
    }},

{
    statics: {
        async searchUser(userName) {
            const userPresent = await this.findById(userName)
            return userPresent;
        },

        async createUser(userName, password) {
            const newUser = new this({
                _id: userName,
                password
            })
            return await newUser.save();
            
        }
    }
})

const userClass = mongoose.model('user', userSchema);

export default userClass