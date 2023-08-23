"use server";

import Payer from "@lib/models/payer.model";
import { connectToDB } from "@lib/mongoose";

export async function fetchPayer(nick: string) {
  try {
    connectToDB();
    return await Payer.findOne({ nick: nick });
  } catch (e: any) {
    throw new Error(`Failed to fetch payer ${e.message}`);
  }
}
