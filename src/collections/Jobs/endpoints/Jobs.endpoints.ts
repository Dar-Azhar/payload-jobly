import { NextResponse } from "next/server";
import { Endpoint, PayloadRequest } from "payload";

export const jobsEndpoint: Endpoint = {
    path: "/hello-jobs",
    method: "get",
    handler: async (req: PayloadRequest) => {
        if (req.user === null) {
            return new Response('Unauthorized', {
                status: 403,
            })
        }
        return NextResponse.json({
            message: "Hello Jobs",
            status: 200,
            success: true,
            user: req?.user
        })
    }
}