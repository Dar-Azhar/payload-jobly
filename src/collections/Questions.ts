import type { CollectionConfig } from 'payload'
import { COMMON_COLUMNS } from './Common-Fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'

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
    }
}
