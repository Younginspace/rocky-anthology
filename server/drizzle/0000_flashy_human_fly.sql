CREATE TABLE `feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text NOT NULL,
	`kind` text NOT NULL,
	`episode_id` text,
	`content` text NOT NULL,
	`lang` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
