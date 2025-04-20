import type { CollectionConfig } from 'payload'
import { COMMON_COLUMNS } from './Common-Fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'
import { AdminOnlyAccess } from '@/access/AdminOnlyAccess'
import { AdminOrRoleAccess } from '@/access/AdminOrRoleAccess'
import JOB_LOCATIONS from '@/app/(frontend)/jobs/[slug]/components/locations'

export const JobApplications: CollectionConfig = {
    slug: 'job-applications',
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: "Job Application",
        plural: "Job Applications",
    },
    fields: [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true
        },
        {
            name: "email",
            label: "Email",
            type: "email",
        },
        {
            name: "job",
            label: "Job",
            type: "relationship",
            relationTo: "jobs",
        },
        {
            name: "phone",
            label: "Phone",
            type: "number",
        },
        {
            name: "location",
            label: "Location",
            type: "select",
            options: JOB_LOCATIONS
        },
        {
            name: "resume",
            label: "Resume",
            type: "upload",
            relationTo: "media",
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
        read: AdminOrRoleAccess('application-manager'),
        create: AdminOrRoleAccess('application-manager'),
        update: AdminOrRoleAccess('application-manager'),
        delete: AdminOnlyAccess,
    }

}
