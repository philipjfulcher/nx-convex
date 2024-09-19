import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages").order("desc").take(100);

    // Add the author's name to each message.
    return Promise.all(
      messages.map(async (message) => {
        const { name, email } = (await ctx.db.get(message.userId))!;
        const likes = await ctx.db
          .query("likes")
          .withIndex("byMessageId", (q) => q.eq("messageId", message._id))
          .collect();

        return { ...message, author: name ?? email!, likes: likes.length };
      }),
    );
  },
});

export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, { body }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in");
    }
    // Send a new message.
    await ctx.db.insert("messages", {
      body: body.replaceAll(":)", "😀"),
      userId,
    });
  },
});

export const like = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), userId))
      .first();

    // Send a new message.
    await ctx.db.insert("likes", {
      messageId,
      liker: user?.name ?? "Unknown user",
    });
  },
});
