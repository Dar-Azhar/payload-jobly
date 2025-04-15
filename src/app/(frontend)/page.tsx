import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import { Menubar } from '@/libs/shadcn/components/ui/menubar'
import { Button } from '@/libs/shadcn/components/ui/button'
import { Card } from '@/libs/shadcn/components/ui/card'


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <Menubar></Menubar>
      <h1 className="text-3xl font-bold underline text-center ">
        Hello world!
      </h1>
      <Button className='text-center'>shadCN UI Test</Button>
      <Card>card</Card>
    </div>
  )
}
