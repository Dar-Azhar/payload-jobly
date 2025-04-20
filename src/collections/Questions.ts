import type { CollectionConfig, Where } from 'payload'
import { COMMON_COLUMNS } from './Common-Fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'
import { User } from '@/payload-types'
import { AdminOnlyAccess } from "@/access/AdminOnlyAccess";


export const Questions: CollectionConfig = {
    slug: 'questions',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
        },
        {
            name: "duration",
            label: "Duration (in minutes)",
            type: "number",
        },
        {
            name: "questionType",
            label: "Question Type",
            type: "select",
            options: [
                {
                    label: "Multiple Choice",
                    value: "mcq",
                },
                {
                    label: "Essay",
                    value: "essay",
                },
            ]
        },
        {
            name: "options",
            label: "Options",
            type: "array",
            admin: {
                condition: (data) => data.questionType === "mcq",
            },
            fields: [
                {
                    name: "option",
                    label: "Option",
                    type: "text",
                },
                {
                    name: "isCorrect",
                    label: "Is Correct",
                    type: "checkbox",
                }
            ]
        },
        {
            name: "response",
            label: "Response",
            type: "textarea",
            admin: {
                condition: (data) => data.questionType === "essay",
            },
        },
        ...COMMON_COLUMNS
    ],
    timestamps: true,
    hooks: {
        beforeChange: [commonCollectionBeforeChangeCreatedByUpdatedByHook],
    },
    access: {
        read: ({ req }) => {
            const user: User | null = req?.user
            if (user?.role === 'admin') {
                return true
            } else if (user?.role === 'question-manager') {
                const where: Where = {
                    createdBy: {
                        equals: user?.id,
                    },
                }
                return where
            }
            return false
        },
        create: ({ req }) => {
            const user: User | null = req?.user
            if (user?.role === 'admin') {
                return true
            } else if (user?.role === 'question-manager') {
                const where: Where = {
                    createdBy: {
                        equals: user?.id,
                    },
                }
                return where
            }
            return false
        },
        update: ({ req }) => {
            const user: User | null = req?.user
            if (user?.role === 'admin') {
                return true
            } else if (user?.role === 'question-manager') {
                const where: Where = {
                    createdBy: {
                        equals: user?.id,
                    },
                }
                return where
            }
            return false
        },
        delete: AdminOnlyAccess
    }
}
