import { DocumentDefinition } from "mongoose";
import { I_UserDocument, UserModel } from '../models/user.model'
import bcrypt from 'bcrypt'

export async function signup(user: DocumentDefinition<I_UserDocument>): Promise<void>{
  try {
    await UserModel.create(user)
  } catch (error) {
    throw error
  }
}

export async function login(user: DocumentDefinition<I_UserDocument>) {
  try {
    const foundUser = await UserModel.findOne({ name: user.username})

    if(!foundUser){
      throw new Error('Name of user is not correct')
    }
    const isMatch = bcrypt.compareSync(user.password, foundUser.password)

    if(isMatch) {
      return foundUser
    } else {
      throw new Error('Username or password is incorrect')
    }
  } catch (error) {
    throw error
  }
  
}