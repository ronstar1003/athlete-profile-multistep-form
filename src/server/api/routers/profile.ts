import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  all: publicProcedure.input(z.object({ text: z.string() })).query(() => {
    return [
      {
        _id: "1",
        firstName: "Elton",
        lastName: "Alcantara",
        gender: 0,
        dateOfBirth: "1984-03-02",
        sports: ["Football", "Baseball"],
      },
      {
        _id: "2",
        firstName: "Roy",
        lastName: "Zhang",
        gender: 1,
        dateOfBirth: "1999-02-22",
        sports: ["Soccer", "Archery", "Wrestling"],
      },
    ];
  }),
});
