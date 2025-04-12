import type { CollectionConfig } from 'payload'
import { COMMON_COLUMNS } from './Common-Fields'

export const Questions: CollectionConfig = {
    slug: 'questions',
    admin: {
        useAsTitle: 'title',
    },
    auth: true,
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
            type: "richText",
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
            type: "richText",
            admin: {
                condition: (data) => data.questionType === "essay",
            },
        },
        ...COMMON_COLUMNS
    ],
}
