import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure
    // .input(z.object({ limit: z.number().optional() }))
    .query(({ ctx }) => {
      return ctx.db.todo.findMany();
    }),

  create: protectedProcedure
    .input(z.object({ subject: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      // simulate a slow db call
      return ctx.db.todo.create({
        data: {
          subject: input.subject,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
