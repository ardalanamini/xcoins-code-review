import { Favorite, FavoriteI } from "#src/models/index.js";
import { Types } from "mongoose";

export async function favorite(favorite: Partial<FavoriteI> = {}) {
  return Favorite.create({
    profile_id: new Types.ObjectId(),
    name: "name",
    favorite1: "favorite1",
    favorite2: "favorite2",
    favorite3: "favorite3",
    ...favorite,
  });
}
