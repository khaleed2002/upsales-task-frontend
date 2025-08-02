import { z } from "zod";
import { Entry } from "../types/Entry";

/**
 *
 * Create Entry
 *
 */
export const createEntrySchema = z.object({
    title: z.string().min(1, "Title is required"),
    type: z.enum(["TV_SHOW", "MOVIE"]),
    director: z.string().min(1, "Director name is required"),
    budget: z.string().min(1, "Budget is required"),
    location: z.string().min(1, "Location is required"),
    duration: z.string().min(1, "Duration is required"),
    yearTime: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
    description: z.string().optional(),
});

export type CreateEntrySchema = z.infer<typeof createEntrySchema>;
export type CreateEntryResponse = {
    success: boolean;
    data: Entry;
};

/**
 *
 * Get Entries
 *
 */

export const getEntriesSchema = z.object({
    page: z.number().nonnegative().optional(),
});

export type GetEntriesSchema = z.infer<typeof getEntriesSchema>;
export type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type GetEntriesResponse = {
    success: boolean;
    data: Entry[];
    pagination: Pagination;
};

/**
 *
 * Update Entry
 *
 */
export const updateEntrySchema = z.object({
    id: z.uuid(),
    title: z.string().optional(),
    type: z.enum(["TV_SHOW", "MOVIE"]).optional(),
    director: z.string().optional(),
    budget: z.string().optional(),
    location: z.string().optional(),
    duration: z.string().optional(),
    yearTime: z.string().optional(),
    description: z.string().optional(),
});
export type UpdateEntrySchema = z.infer<typeof updateEntrySchema>;

export type UpdateEntryResponse = {
    success: boolean;
    data: Entry;
};

/**
 *
 * Delete Entry
 *
 */
export const deleteEntrySchema = z.object({
    id: z.string().uuid(),
});
export type DeleteEntrySchema = z.infer<typeof deleteEntrySchema>;

export type DeleteEntryResponse = {
    success: boolean;
    message: string;
};
