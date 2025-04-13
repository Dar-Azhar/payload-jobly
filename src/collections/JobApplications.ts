import type { CollectionConfig } from 'payload'
import { COMMON_COLUMNS } from './Common-Fields'

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
            name: "cv",
            label: "CV",
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
    timestamps: true

}
