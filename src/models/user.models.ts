import mongoose, {Schema, Document} from 'mongoose';

export interface Message extends Document {
    content : string;
    createdAt : Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
})


export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry:Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]
    createdAt : Date
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required: [true, "Username is required"],
        unique: [true, "Username should be unique"],
        trim: true,

    },
    email:{
        type:String,
        required: [true, "Email is required"],
        unique: [true, "Email should be unique"],
        trim: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password:{
        type:String,
        required: [true, "Password is required"],
        trim: true,
        select: false,
        minlength: [6, "Password should be at least 6 characters long"]
    },
    verifyCode:{
        type:String,
        required: [true, "Verification code is required"],
        trim: true,
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "Verification code expiry is required"],
    },

    isAcceptingMessage:{
        type:Boolean,
        default: true
    },

    isVerified:{
        type:Boolean,
        default: false
    },
    messages: [MessageSchema],

    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel;
