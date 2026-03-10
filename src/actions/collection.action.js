"use server";

import {getCurrentUser} from "@/lib/auth";
import Collection from "@/models/collection.model";
import connectDB from "@/lib/db";
import {revalidatePath} from "next/cache";

export const createCollection = async (data) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const {name, description} = data;

    const collection = await Collection.create({
      name,
      description,
      userId: user.id,
    });

    // revalidatePath("/");
    return {success: true, data: JSON.parse(JSON.stringify(collection))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getCollections = async () => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const collections = await Collection.find({userId: user.id}).sort({
      createdAt: -1,
    });

    return {success: true, data: JSON.parse(JSON.stringify(collections))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getCollectionById = async (id) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const collection = await Collection.findOne({_id: id, userId: user.id});
    if (!collection) throw new Error("Collection not found!");

    return {success: true, data: JSON.parse(JSON.stringify(collection))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const updateCollection = async (id, data) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const updateFields = {};
    if (data.name !== undefined) updateFields.name = data.name;
    if (data.description !== undefined)
      updateFields.description = data.description;

    const collection = await Collection.findOneAndUpdate(
      {_id: id, userId: user.id},
      {$set: updateFields},
      {new: true},
    );
    if (!collection) throw new Error("Collection not found!");

    revalidatePath("/collections");
    return {success: true, data: JSON.parse(JSON.stringify(collection))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const deleteCollection = async (id) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const collection = await Collection.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    if (!collection) throw new Error("Collection not found!");

    revalidatePath("/collections");
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};
