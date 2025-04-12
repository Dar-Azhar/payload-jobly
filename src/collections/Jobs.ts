import { CollectionConfig, } from "payload";
import { COMMON_COLUMNS } from "./Common-Fields";

export const Jobs: CollectionConfig = {
    slug: 'jobs',

    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'location'],
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
                            type: 'richText',
                            required: true,
                        },


                        {
                            name: 'salary',
                            type: 'number',
                            required: true
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
        ]
}