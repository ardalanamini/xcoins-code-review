import { DBURL } from "#src/config.js";
import { Favorite, Profile, Simulator } from "#src/models/index.js";
import mongoose from "mongoose";

(async () => {

  mongoose.connect(DBURL);

  const profile = new Profile({
    name: "String",
    email: "String",
    capital: mongoose.Types.Decimal128.fromString("123"),
    divisa: "String",
    prefered_cryptocurrency: "String",
  });
  await profile.save();

  const query = { _id: "6093abb3dfd9da1deeae56f2" };
  const idProfile = await Profile.findOne(query).then(e => e?._id);

  const simulator = new Simulator({
    profile_id: idProfile,
    name: "String",
    start_date: "01/05/2021",
    check_date: "01/05/2021",
    cryptocurrency: "String",
    divisa: "String",
    Crypto_price_start: "123",
    Crypto_price_check: "123",
  });
  await simulator.save();

  const favorite = new Favorite({
    profile_id: idProfile,
    name: "String",
    favorite1: "String",
    favorite2: "String",
    favorite3: "String",
  });
  await favorite.save();

  mongoose.disconnect();
})();
