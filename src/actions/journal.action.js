"use server";

import {getCurrentUser} from "@/lib/auth";
import Entry from "@/models/entry.model";
import connectDB from "@/lib/db";
import {revalidatePath} from "next/cache";
import Collection from "@/models/collection.model";
import {convertToObject} from "@/lib/utils";

export const createJournal = async (data) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const entry = await Entry.create({
      ...data,
      userId: user?.id,
    });

    revalidatePath("/journal");

    return {success: true, data: convertToObject(entry)};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getUserJournalEntries = async () => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const entries = await Entry.find({userId: user.id}).sort({createdAt: -1});

    return {success: true, data: convertToObject(entries)};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getEntriesByCollectionId = async (collectionId) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const entries = await Entry.find({
      collectionId,
      userId: user.id,
    }).sort({createdAt: -1});

    return {success: true, data: JSON.parse(JSON.stringify(entries))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getUnorganizedEntries = async () => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const entries = await Entry.find({
      userId: user.id,
      $or: [
        {collectionId: null},
        {collectionId: ""},
        {collectionId: {$exists: false}},
      ],
    }).sort({createdAt: -1});

    return {success: true, data: JSON.parse(JSON.stringify(entries))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getJournalEntryById = async (id) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const entry = await Entry.findOne({_id: id, userId: user.id});
    if (!entry) throw new Error("Entry not found!");

    return {success: true, data: JSON.parse(JSON.stringify(entry))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const deleteJournalEntry = async (id) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    const entry = await Entry.findOneAndDelete({_id: id, userId: user.id});
    if (!entry) throw new Error("Entry not found!");

    revalidatePath("/journal");
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const updateJournalEntry = async (id, data) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");

    await connectDB();

    // Prevent overwriting protected fields
    const {userId, _id, ...safeData} = data;

    const entry = await Entry.findOneAndUpdate(
      {_id: id, userId: user.id},
      {...safeData},
      {new: true},
    );
    if (!entry) throw new Error("Entry not found!");

    revalidatePath(`/journal/${id}`);
    return {success: true, data: JSON.parse(JSON.stringify(entry))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const getJournalById = async (id) => {
  try {
    const {user} = await getCurrentUser();
    if (!user) throw new Error("Unauthorized!");
    await connectDB();
    const entry = await Entry.findOne({_id: id, userId: user.id}).lean();
    if (!entry) throw new Error("Entry not found!");
    return {success: true, data: JSON.parse(JSON.stringify(entry))};
  } catch (error) {
    return {success: false, error: error.message};
  }
};
