import { JobApplication } from "@/payload-types";
import { NextResponse } from "next/server";
import { Endpoint, PayloadRequest } from "payload";

export const jobsEndpoint: Endpoint = {
    path: "/apply",
    method: "post",
    handler: async (req: PayloadRequest) => {
        const payload = req.payload
        try {
            const formData = await req.formData?.();
            if (!formData) {
                return new Response("Invalid form data", { status: 400 });
            }

            const name = formData.get("name") as string;
            const email = (formData.get("email") as string)?.trim();
            const phone = formData.get("phone");
            const location = formData.get("location") as string;
            const job_id = formData.get("job_id") as string;
            const resume = formData.get("resume") as File | null;
            let resumeId = null;
            if(resume){

            const buffer = Buffer.from(await resume.arrayBuffer());
            const uploadedFile = await payload.create({
                collection: "media",
                file: {
                    data: buffer,
                    mimetype: resume.type,
                    name: resume.name,
                    size: resume.size,
                },
                data: {
                    alt: "Resume",
                },
            });
            resumeId = uploadedFile.id;

        }
            const jobApplication: JobApplication = await payload.create({
                collection: "job-applications",
                data: {
                    name: name,
                    email: email,
                    phone: phone ? parseInt(phone as string, 10) : null,
                    location: location,
                    job: job_id,
                    resume: resumeId
                },
            });
            return NextResponse.json({
                message: "Job application submitted successfully",
                status: 200,
                data: jobApplication
            })

        } catch (error) {
            console.error(error);
            return new Response('Internal Server Error', {
                status: 500,
            });
        }
    }
}