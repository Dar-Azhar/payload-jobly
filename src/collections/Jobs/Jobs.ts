import { CollectionConfig, FieldHook, FieldHookArgs } from "payload";
import { COMMON_COLUMNS } from "../Common-Fields";
import { Job, User } from "@/payload-types";
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from "./hooks/jobsBeforeChange.hook";
import { jobsEndpoint } from "./endpoints/Jobs.endpoints";
import { AdminOnlyAccess } from "@/access/AdminOnlyAccess";
import { AdminOrRoleAccess } from "@/access/AdminOrRoleAccess";

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
                            required: true,
                            access: {
                                update: ({ req }) => {
                                    const user: User | null = req?.user
                                    return user?.role === 'admin'
                                }
                            }
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
    },
    endpoints: [jobsEndpoint],
    access: {
        read: ({ req }) => {
            const user: User | null = req?.user
            return (
                user?.role === 'admin' ||
                user?.role === 'application-manager' ||
                user?.role === 'job-manager'
            )
        },
        create: AdminOrRoleAccess('job-manager'),
        update: AdminOrRoleAccess('job-manager'),
        delete: AdminOnlyAccess,
    }
}