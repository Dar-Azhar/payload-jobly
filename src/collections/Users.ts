import type { CollectionConfig } from 'payload'
import { COMMON_COLUMNS } from './Common-Fields'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'active',
      label: "Is Active",
      type: "checkbox",
      defaultValue: true,
    },

    {
      name: 'mark as active',
      type: 'ui',
      admin: {
        components: {
          Field: '/ButtonComponent',
          Cell: '/ButtonComponent',
        }
      }
    },
    ...COMMON_COLUMNS
  ],
}
