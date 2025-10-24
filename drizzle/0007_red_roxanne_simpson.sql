CREATE TYPE "public"."user_roles" AS ENUM('student', 'manager');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'student' NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "password";