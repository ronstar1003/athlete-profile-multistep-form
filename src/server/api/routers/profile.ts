/* eslint-disable @typescript-eslint/no-unsafe-return */
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
        gender: z.union([z.number(), z.null()]),
        sports: z.array(z.string()),
        description: z.string(),
        location: z.string(),
        team: z.string(),
      })
    )
    .mutation(async (req) => {
      await dbConnect();

      const newProfile = await Profile.create(req.input);
      return { ...newProfile, _id: newProfile._id.toString() };
    }),
});
