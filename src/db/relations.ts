import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  spots: {
    submittedByUser: r.one.user({
      from: r.spots.submittedBy,
      to: r.user.id,
    }),
    images: r.many.spotImages(),
    ratings: r.many.spotRatings(),
    comments: r.many.comments(),
  },
  spotImages: {
    spot: r.one.spots({
      from: r.spotImages.spotId,
      to: r.spots.id,
    }),
    uploadedByUser: r.one.user({
      from: r.spotImages.uploadedBy,
      to: r.user.id,
    }),
  },
  spotRatings: {
    spot: r.one.spots({
      from: r.spotRatings.spotId,
      to: r.spots.id,
    }),
    user: r.one.user({
      from: r.spotRatings.userId,
      to: r.user.id,
    }),
  },
  comments: {
    spot: r.one.spots({
      from: r.comments.spotId,
      to: r.spots.id,
    }),
    user: r.one.user({
      from: r.comments.userId,
      to: r.user.id,
    }),
    parent: r.one.comments({
      from: r.comments.parentId,
      to: r.comments.id,
      alias: "commentReplies",
    }),
    replies: r.many.comments({
      alias: "commentReplies",
    }),
  },
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
}));
