import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import ApplyJob from './components/ApplyJob'


const page = async ({ params }) => {
    const { slug } = await params

    const payload = await getPayload({ config })
    const jobsDoc = await payload.find({
        collection: 'jobs',
        where: {
            slug: {
                equals: slug
            }
        }
    })
    return (
        <div>
            <h1>{jobsDoc.docs[0].title}</h1>
            <p>{jobsDoc.docs[0].description}</p>
            <ApplyJob job={jobsDoc.docs[0]} />
        </div>
    )
}

export default page