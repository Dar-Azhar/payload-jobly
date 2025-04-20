import type { CollectionConfig } from 'payload'
import { COMMON_COLUMNS } from '../Common-Fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from '../Jobs/hooks/jobsBeforeChange.hook'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 30,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Job Manager',
          value: 'job-manager',
        },
        {
          label: 'Assesment Manager',
          value: 'assesment-manager',
        },
        {
          label: 'Application Manager',
          value: 'application-manager',
        },
        {
          label: 'Question Manager',
          value: 'question-manager',
        },
      ],
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
          Field: '/collections/Users/ui/ButtonComponent',
          Cell: '/collections/Users/ui/ButtonComponent',
        }
      }
    },
    ...COMMON_COLUMNS
  ],
  timestamps: true,
  hooks: {
    beforeChange: [commonCollectionBeforeChangeCreatedByUpdatedByHook],
  }
}
