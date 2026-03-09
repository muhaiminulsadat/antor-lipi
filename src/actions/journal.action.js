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
