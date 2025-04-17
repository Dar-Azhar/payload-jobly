import { Field } from "payload";

export const COMMON_COLUMNS: Field[] = [
    // {
    //     name: "createdAt",
    //     type: "date",
    //     admin: {
    //         date: {
    //             pickerAppearance: "dayAndTime"
    //         }
    //     }
    // },
    // {
    //     name: "updatedAt",
    //     type: "date",
    //     admin: {
    //         date: {
    //             pickerAppearance: "dayAndTime"
    //         }
    //     }
    // },
    {
        label: "createdBy",
        name: "createdBy",
        type: "relationship",
        hasMany: false,
        relationTo: "users",
        admin: {
            readOnly: true,
            condition: (data) => {
                return !!data?.createdBy
            }
        }
    },
    {
        label: "updatedBy",
        name: "updatedBy",
        type: "relationship",
        hasMany: false,
        relationTo: "users",
        admin: {
            readOnly: true,
            condition: (data) => {
                return !!data?.updatedBy
            }
        }
    }
]