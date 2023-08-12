
"use server"

import { revalidatePath } from "next/cache";
import Expand from "../models/expand.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string
}
export async function createExpansion({ text, author, communityId, path }: Params) {
  
  try {
    connectToDB();

    const createExpanstion = await Expand.create({
      text,
      author,
      communityId: null, //TODO: Create communityId
    })
  
    //Update User Model
    await User.findByIdAndUpdate(author, {
      $push: {
        expansions: createExpanstion._id
      }
    })
  
    revalidatePath(path);  
  }
  catch (error: any) {
    throw new Error(`Failed to create expansion: ${error.message}`)
  }
  

}