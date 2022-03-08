import { Profile, ProfileI } from "#src/models/index.js";
import { Types } from "mongoose";

export async function profile(profile: Partial<ProfileI> = {}) {
  return Profile.create({
    email: "example@example.com",
    name: "name",
    nickname: "nickname",
    capital: Types.Decimal128.fromString("0"),
    divisa: "divisa",
    prefered_cryptocurrency: "prefered_cryptocurrency",
    ...profile,
  });
}
