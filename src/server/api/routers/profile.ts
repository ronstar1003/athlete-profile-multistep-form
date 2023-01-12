import { z } from "zod";
import dbConnect from "../../../lib/dbConnect";
import Profile from "../../../models/Profile";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (req) => {
      await dbConnect();
      if (!req.input.id) return await Profile.find({});
      return await Profile.findOne({ _id: req.input.id });
    }),
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        dateOfBirth: z.string(),
        gender: z.number(),
        sports: z.array(z.string()),
        description: z.string(),
        location: z.string(),
        team: z.string(),
      })
    )
    .mutation(async (req) => {
      await dbConnect();

      return await Profile.create(req.input);
    }),
});
