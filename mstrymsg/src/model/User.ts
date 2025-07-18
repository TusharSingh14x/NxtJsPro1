import mongoose,{Schema,Document} from "mongoose";
 export interface Message extends Document{
content:string;
createdAt:Date
 }
 const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
 })

 export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifycode:string;
    verifyCodeexpiry:Date;
     isVerified:boolean;
    isAcceptedMessage:boolean;
    messages:Message[]
 }

 const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'please use a valid email']

    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifycode:{
            type:String,
        required:[true,"Verification code is required"]
    },
    verifyCodeexpiry:{
        type:Date,
        required:[true,"expiry date is required"]
    },
    isVerified:{
type:Boolean,
default:false,
    },
isAcceptedMessage:{
    type:Boolean,
    default:true
},
messages:[MessageSchema]
 })

 const UserModel=(mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",UserSchema);

 export default UserModel;