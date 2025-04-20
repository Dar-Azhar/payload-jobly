'use client'
import React, { useState } from 'react'
import { Form } from '@/libs/shadcn/components/ui/form'
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from '@/libs/shadcn/components/ui/button'
import { FormTextEditor } from '@/libs/form/FormTextEditor/FormTextEditor'
import { FormDropdown } from '@/libs/form/FormDropDown/FormDropDown'
import { FormUpload } from '@/libs/form/FormUpload/FormUpload'
import { Loader2 } from 'lucide-react'
import { Job } from '@/payload-types'
import { JobApplyFormSchema, JobApplyFormSchemaType } from './job-app.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { JobApplications } from '@/collections/JobApplications'
// import type { Field } from '@/payload-types';

export interface ApplyJobProps {
    job: Job
}
const ApplyJob = ({ job }: ApplyJobProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const defaultValues = {
        name: '',
        email: '',
        phone: '',
        location: '',
        job_id: job.id,
        resume: undefined,
    }
    const form = useForm<JobApplyFormSchemaType>({
        resolver: zodResolver(JobApplyFormSchema),
        defaultValues,
    })
    const onSubmit: SubmitHandler<JobApplyFormSchemaType> = async (data: JobApplyFormSchemaType) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('phone', data.phone)
            formData.append('location', data.location)
            formData.append('job_id', data.job_id)
            if (data.resume) {
                formData.append('resume', data.resume as File);
            } else {
                console.log('No resume provided');
            }

            const response = await fetch('/api/jobs/apply', {
                method: 'POST',
                body: formData,
            })
            setLoading(false)
            if (response.ok) {
                toast('Application submitted successfully', {
                    position: 'bottom-right',
                })
                form.reset();
            }
        } catch (error) {
            console.error('Unexpected error occurred:', error)
            setLoading(false)
            toast('Unexpected error occurred', {
                position: 'bottom-right',
            })

        }
        // console.log("data", data)
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                    {JobApplications.fields.map((field, index) => {
                        const basicField = field as {
                            name?: string;
                            label?: string;
                            type: string;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            options?: any[];
                            placeholder?: string;
                        };
                        const { name, label, type, options } = basicField;
                        // Skip non-form fields like admin-only, timestamp fields, etc.
                        if (
                            ['createdBy', 'updatedBy', 'createdAt', 'updatedAt', 'status'].includes(name as 'name')
                        ) return null;

                        switch (type) {
                            case 'text':
                            case 'email':
                            case 'number':
                                return (
                                    <FormTextEditor
                                        key={name || index}
                                        control={form.control}
                                        name={name as 'name'}
                                        label={label}
                                        placeholder={`Enter your ${label}`}
                                        type={type}
                                    />
                                );

                            case 'select':
                                return (
                                    <FormDropdown
                                        key={name || index}
                                        control={form.control}
                                        name={name as 'name'}
                                        label={label}
                                        options={options || []}
                                    />
                                );

                            case 'upload':
                                return (
                                    <FormUpload
                                        key={name || index}
                                        control={form.control}
                                        name={name as 'name'}
                                        label={label}
                                    />
                                );

                            // default:
                            //     return (
                            //         <p key={name || index} className="text-red-500">
                            //             {field.type} is not a supported field type
                            //         </p>
                            //     );
                        }
                    })}
                    <div className="text-sm text-gray-600">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                required={true}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            By clicking submit, you agree to our{' '}
                            <a href="/terms" className="text-blue-500 underline">
                                terms and conditions
                            </a>
                        </label>
                        {/* {form.formState.errors.termsAccepted && (
                            <p className="mt-1 text-sm text-red-600">You must accept the terms</p>
                        )} */}
                    </div>
                    <Button disabled={loading} type="submit" className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
export default ApplyJob