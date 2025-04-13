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
        name: "CreatedBy",
        type: "relationship",
        hasMany: false,
        relationTo: "users",
    },
    {
        label: "updatedBy",
        name: "updatedBy",
        type: "relationship",
        hasMany: false,
        relationTo: "users",
    }
]