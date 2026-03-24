import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  integer,
  numeric,
  AnyPgColumn,
  check,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// TODO: Improve this tables and add RLS

export const spots = pgTable(
  "spots",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    country: text("country").notNull(),
    city: text("city").notNull(),
    address: text("address"),
    mapUrl: text("map_url"),
    submittedBy: text("submitted_by").references(() => user.id, {
      onDelete: "set null",
    }),
    latitude: numeric("latitude", { precision: 10, scale: 8 }).notNull(),
    longitude: numeric("longitude", { precision: 11, scale: 8 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    check(
      "spots_latitude_range_chk",
      sql`${table.latitude} BETWEEN -90 AND 90`,
    ),
    check(
      "spots_longitude_range_chk",
      sql`${table.longitude} BETWEEN -180 AND 180`,
    ),
    index("spots_location_idx").on(table.latitude, table.longitude),
    index("spots_city_country_idx").on(table.city, table.country),
    index("spots_submitted_by_idx").on(table.submittedBy),
  ],
);

export const spotImages = pgTable(
  "spot_images",
  {
    id: text("id").primaryKey(),
    spotId: text("spot_id")
      .references(() => spots.id, { onDelete: "cascade" })
      .notNull(),
    uploadedBy: text("uploaded_by")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("spot_images_spot_idx").on(table.spotId),
    index("spot_images_uploaded_by_idx").on(table.uploadedBy),
  ],
);

export const spotRatings = pgTable(
  "spot_ratings",
  {
    id: text("id").primaryKey(),
    spotId: text("spot_id")
      .references(() => spots.id, { onDelete: "cascade" })
      .notNull(),
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    stars: integer("stars").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    check("stars_between_1_and_5", sql`${table.stars} BETWEEN 1 AND 5`),
    index("spot_ratings_spot_idx").on(table.spotId),
    index("spot_ratings_user_idx").on(table.userId),
    uniqueIndex("spot_ratings_unique_user").on(table.spotId, table.userId),
  ],
);
export const comments = pgTable(
  "comments",
  {
    id: text("id").primaryKey(),
    spotId: text("spot_id")
      .references(() => spots.id, { onDelete: "cascade" })
      .notNull(),
    parentId: text("parent_id").references((): AnyPgColumn => comments.id), // self-referencing
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    content: text().notNull(),
    path: text().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("comments_spot_parent_idx").on(table.spotId, table.parentId),
    index("comments_path_idx").on(table.spotId, table.path),
    index("comments_user_idx").on(table.userId),
  ],
);

// =========================================================================
//                          AUTH SCHEMAS
// =========================================================================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  nickname: text("nickname"),
  favoritesSpots: integer("favorites_spots").array(),
  age: integer("age"),
  country: text("country"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("account_userId_idx").on(table.userId),
    uniqueIndex("account_provider_account_unique").on(
      table.providerId,
      table.accountId,
    ),
  ],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);
