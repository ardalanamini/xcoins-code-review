import { DATABASE_URI } from "#src/config.js";
import { Favorite, Profile, Simulator } from "#src/models/index.js";
import mongoose from "mongoose";

(async () => {
  await mongoose.connect(DATABASE_URI);

  const profile = await Profile.create({
    email: "String",
    name: "String",
    nickname: "String",
    capital: mongoose.Types.Decimal128.fromString("123"),
    divisa: "String",
    prefered_cryptocurrency: "String",
  });

  await Promise.all([
    Simulator.create({
      profile_id: profile._id,
      recorded_at: new Date("01/05/2021"),
      cryptocurrency: "String",
      euros: mongoose.Types.Decimal128.fromString("0"),
      price: mongoose.Types.Decimal128.fromString("0"),
      quantity: mongoose.Types.Decimal128.fromString("0"),
    }),
    Favorite.create({
      profile_id: profile._id,
      name: "String",
      favorite1: "String",
      favorite2: "String",
      favorite3: "String",
    }),
  ]);

  await mongoose.disconnect();
})();
