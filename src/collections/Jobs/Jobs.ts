import { CollectionConfig, FieldHook, FieldHookArgs } from "payload";
import { COMMON_COLUMNS } from "../Common-Fields";
import { Job } from "@/payload-types";
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from "./hooks/jobsBeforeChange.hook";

const convertToSlug = (text: string) => {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
const beforeChangeSlugFieldJobsHook: FieldHook = async (args: FieldHookArgs<Job>) => {
    const { data } = args
    if (data?.title) {
        data.slug = convertToSlug(data.title)
    }
}
export const Jobs: CollectionConfig = {
    slug: 'jobs',

    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'location', "createdAt", "createdBy"],
    },
    fields:
        [
            {

                type: "tabs",
                tabs: [
                    {
                        label: 'Basic Info',
                        description: 'Basic job information',
                        fields: [{
                            type: "row",
                            fields: [{
                                name: 'title',
                                type: 'text',
                                required: true,
                                admin: {
                                    width: "30%",
                                }
                            },
                            {
                                name: "location",
                                type: "select",
                                defaultValue: "remote",
                                options: [
                                    {
                                        label: "Remote",
                                        value: "remote",
                                    },
                                    {
                                        label: "On-site",
                                        value: "onsite",
                                    },
                                    {
                                        label: "Hybrid",
                                        value: "hybrid",
                                    },
                                ],
                            },
                            ]
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            required: true,
                        },
                        {
                            name: 'salary',
                            label: 'Salary',
                            type: 'number',
                            required: true
                        },
                        {
                            name: "slug",
                            label: "Slug",
                            type: "text",
                            hooks: {
                                beforeChange: [beforeChangeSlugFieldJobsHook],
                            },
                        },
                        {
                            name: "isActive",
                            type: "checkbox",
                            defaultValue: true,
                            required: true
                        },]
                    }
                ]
            },
            ...COMMON_COLUMNS
        ],
    timestamps: true,
    hooks: {
        beforeChange: [commonCollectionBeforeChangeCreatedByUpdatedByHook],
    }
}