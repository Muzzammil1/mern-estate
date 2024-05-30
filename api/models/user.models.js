const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    emails: {
        type: String,
        required: true,
        unique: true
    },
    passwords: {
        type: String,
        required: true,
    }
}, { timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;