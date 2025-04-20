import type { CollectionConfig } from 'payload'
import { COMMON_COLUMNS } from './Common-Fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'
import { AdminOrRoleAccess } from '@/access/AdminOrRoleAccess'
import { AdminOnlyAccess } from '@/access/AdminOnlyAccess'

export const Assesments: CollectionConfig = {
    slug: 'assesments',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            label: "Title",
            type: 'text',
            required: true
        },
        {
            name: 'description',
            label: "Description",
            type: 'textarea',
        },
        {
            name: 'job',
            label: "Job",
            type: 'relationship',
            relationTo: 'jobs',
        },
        {
            name: 'questons',
            label: "Questions",
            type: 'relationship',
            relationTo: 'questions',
            hasMany: true
        },
        {
            name: "status",
            label: "Status",
            type: "select",
            options: [
                {
                    label: "Applied",
                    value: "applied",
                },
                {
                    label: "Interviewing",
                    value: "interviewing",
                },
                {
                    label: "Selected",
                    value: "selected",
                },
                {
                    label: "Rejected",
                    value: "rejected",
                },
            ]
        },
        ...COMMON_COLUMNS

    ],
    timestamps: true,
    hooks: {
        beforeChange: [commonCollectionBeforeChangeCreatedByUpdatedByHook],
    },
    access: {
        read: AdminOrRoleAccess('assesment-manager'),
        create: AdminOrRoleAccess('assesment-manager'),
        update: AdminOrRoleAccess('assesment-manager'),
        delete: AdminOnlyAccess,
    }
}
