import { Job } from "@/payload-types";
import { CollectionBeforeChangeHook } from "payload";

export const commonCollectionBeforeChangeCreatedByUpdatedByHook: CollectionBeforeChangeHook<Job> = async ({ data, req, operation }: Parameters<CollectionBeforeChangeHook<Job>>[0]) => {

    const { user } = req

    if (user) {
        if (operation === 'create') {
            data.createdBy = user.id
        }
        if (operation === 'update') {
            data.updatedBy = user.id
        }
    }
    // return data
}