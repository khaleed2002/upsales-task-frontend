export const entryTypes = ["TV_SHOW", "MOVIE"] as const;

export type EntryType = (typeof entryTypes)[number];
export type Entry = {
    id: string;
    title: string;
    type: EntryType;
    director: string;
    budget: string;
    location: string;
    duration: string;
    yearTime: string;
    description: string | null;
    imageUrl: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
};
