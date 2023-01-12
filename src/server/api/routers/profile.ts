import { z } from "zod";
import dbConnect from "../../../lib/dbConnect";
import Profile from "../../../models/Profile";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  all: publicProcedure.input(z.object({ text: z.string() })).query(async () => {
    await dbConnect();

    const profiles = await Profile.find({});

    return profiles;
  }),
});
