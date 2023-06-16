import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";
import bcrypt from 'bcrypt'


const UsersSchema: Schema = new Schema<IUser>({
    username : {
        type: String,
        requared: true
    },
    password : {
        type: String,
        requared: true
    }
})

UsersSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  });

  UsersSchema.set('toJSON', {
    transform: (doc, ret, options) => {
      delete ret.password;
      return ret;
    }
  });


export const Users = mongoose.model<IUser>('users', UsersSchema)