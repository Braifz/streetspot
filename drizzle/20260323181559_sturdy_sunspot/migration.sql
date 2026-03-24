CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" text PRIMARY KEY,
	"spot_id" text NOT NULL,
	"parent_id" text,
	"user_id" text NOT NULL,
	"content" text NOT NULL,
	"path" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spot_images" (
	"id" text PRIMARY KEY,
	"spot_id" text NOT NULL,
	"uploaded_by" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spot_ratings" (
	"id" text PRIMARY KEY,
	"spot_id" text NOT NULL,
	"user_id" text NOT NULL,
	"stars" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stars_between_1_and_5" CHECK ("stars" BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "spots" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"country" text NOT NULL,
	"city" text NOT NULL,
	"address" text,
	"map_url" text,
	"submitted_by" text,
	"latitude" numeric(10,8) NOT NULL,
	"longitude" numeric(11,8) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "spots_latitude_range_chk" CHECK ("latitude" BETWEEN -90 AND 90),
	CONSTRAINT "spots_longitude_range_chk" CHECK ("longitude" BETWEEN -180 AND 180)
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"nickname" text,
	"favorites_spots" integer[],
	"age" integer,
	"country" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "account_provider_account_unique" ON "account" ("provider_id","account_id");--> statement-breakpoint
CREATE INDEX "comments_spot_parent_idx" ON "comments" ("spot_id","parent_id");--> statement-breakpoint
CREATE INDEX "comments_path_idx" ON "comments" ("spot_id","path");--> statement-breakpoint
CREATE INDEX "comments_user_idx" ON "comments" ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "spot_images_spot_idx" ON "spot_images" ("spot_id");--> statement-breakpoint
CREATE INDEX "spot_images_uploaded_by_idx" ON "spot_images" ("uploaded_by");--> statement-breakpoint
CREATE INDEX "spot_ratings_spot_idx" ON "spot_ratings" ("spot_id");--> statement-breakpoint
CREATE INDEX "spot_ratings_user_idx" ON "spot_ratings" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "spot_ratings_unique_user" ON "spot_ratings" ("spot_id","user_id");--> statement-breakpoint
CREATE INDEX "spots_location_idx" ON "spots" ("latitude","longitude");--> statement-breakpoint
CREATE INDEX "spots_city_country_idx" ON "spots" ("city","country");--> statement-breakpoint
CREATE INDEX "spots_submitted_by_idx" ON "spots" ("submitted_by");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_spot_id_spots_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_comments_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id");--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "spot_images" ADD CONSTRAINT "spot_images_spot_id_spots_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "spot_images" ADD CONSTRAINT "spot_images_uploaded_by_user_id_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "spot_ratings" ADD CONSTRAINT "spot_ratings_spot_id_spots_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "spot_ratings" ADD CONSTRAINT "spot_ratings_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "spots" ADD CONSTRAINT "spots_submitted_by_user_id_fkey" FOREIGN KEY ("submitted_by") REFERENCES "user"("id") ON DELETE SET NULL;