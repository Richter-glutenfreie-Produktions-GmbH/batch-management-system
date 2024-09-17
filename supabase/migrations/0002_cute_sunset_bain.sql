ALTER TABLE "batches_bt" ALTER COLUMN "expires_on" SET DEFAULT '2025-09-17T13:36:06.520Z';--> statement-breakpoint
ALTER TABLE "manufactured_batches" ALTER COLUMN "manufactured_on" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "received_batches" ALTER COLUMN "delivered_on" SET DEFAULT now();