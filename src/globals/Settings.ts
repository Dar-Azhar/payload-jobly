import { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
    slug: 'settings',
    fields: [
        {
            name: 'siteName',
            type: 'text',
            required: true,
        },
        {
            name: 'siteDescription',
            type: 'text',
            required: true,
        },
        {
            name: 'siteUrl',
            type: 'text',
            required: true,
        },
        {
            name: 'contactEmail',
            label: 'Contact Email',
            type: 'email',
            required: true,
        },
        {
            name: 'socialMediaLinks',
            label: 'Social Media Links',
            type: 'array',
            fields: [
                {
                    name: 'platform',
                    label: 'Platform',
                    type: 'text',
                },
                {
                    name: 'url',
                    label: 'URL',
                    type: 'text',
                },
            ],
        },
    ]
}