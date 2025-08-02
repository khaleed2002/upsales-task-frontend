import { api } from "@/lib/axios";
import {
    CreateEntryResponse,
    CreateEntrySchema,
    DeleteEntryResponse,
    DeleteEntrySchema,
    GetEntriesResponse,
    GetEntriesSchema,
    UpdateEntryResponse,
    UpdateEntrySchema,
} from "../schemas/entity.schema";

class EntityService {
    constructor() {}
    async createEntry(data: CreateEntrySchema) {
        const response = await api.post<CreateEntryResponse>("/entry", data);
        return response.data.data;
    }
    async getEntries(data?: GetEntriesSchema) {
        const response = await api.get<GetEntriesResponse>(
            `/entry?page=${data?.page || 1}`
        );
        return response.data;
    }
    async updateEntry(data: UpdateEntrySchema) {
        const { id, ...rest } = data;
        const response = await api.put<UpdateEntryResponse>(
            `/entry/${id}`,
            rest
        );
        return response.data.data;
    }
    async deleteEntry(data: DeleteEntrySchema) {
        const response = await api.delete<DeleteEntryResponse>(
            `/entry/${data.id}`
        );
        return response.data;
    }
}

export const entityService = new EntityService();
