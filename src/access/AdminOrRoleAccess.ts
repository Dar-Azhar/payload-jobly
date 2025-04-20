import { User } from "@/payload-types"
import { Access } from "payload"
import { AdminOnlyAccess } from "./AdminOnlyAccess"

export const AdminOrRoleAccess = (role: User['role']) => {
    const access: Access = ({ req }) => {
        const user: User | null = req?.user
        return AdminOnlyAccess({ req }) || user?.role === role
    }
    return access
}