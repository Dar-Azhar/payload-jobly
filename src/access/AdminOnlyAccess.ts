import { User } from "@/payload-types"
import { Access } from "payload"

export const AdminOnlyAccess: Access = ({ req }) => {
    const user: User | null = req?.user
    return user?.role === 'admin'
}