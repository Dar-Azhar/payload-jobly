import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/shadcn/components/ui/card'
import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
export default async function JobsPage() {
    const payload = await getPayload({ config })

    const jobsDoc = await payload.find({
        collection: 'jobs',
        pagination: false,
    })

    return (
        <div>
            {jobsDoc.docs.map(({ id, title, description, slug }) => {
                return (
                    <Link key={id} href={`/jobs/${slug}`} className='shadow-xl'>
                        <Card className="w-full mx-3 mt-1" key={id}>
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}.</CardDescription>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
