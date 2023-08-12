
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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;
  const postsQuery = Expand.find({
    parentId: {
      $in: [null, undefined]
    }
  })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'author',
      model: User,
    })
    .populate({
      path: 'children',
      populate: {
        path: 'author',
        model: User,
        select: "_id name parentId image"
      }
    })
  
  const totalPostCount = await Expand.countDocuments({ parentId: { $in: [null, undefined] } })
  
  const posts = await postsQuery.exec();

  const isNext = totalPostCount > pageNumber + posts.length;

  return { posts, isNext }

}

export async function fetchExpandById(id: string) {

  connectToDB();

  try {

    //TODO: Populate Community
    const expand = await Expand.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: '_id id name image'
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name parentId image'
          },
          {
            path: 'children',
            model: Expand,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name parentId image'
            }
          }
        ]
      }).exec();
    
    return expand;
  } catch (error: any) {
    throw new Error(`Failed to fetch expansion: ${error.message}`)
  }
}