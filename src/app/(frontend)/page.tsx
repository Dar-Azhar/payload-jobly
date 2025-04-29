// import { headers as getHeaders } from 'next/headers.js'
// import { getPayload } from 'payload'

// import config from '@/payload.config'
import React from 'react'
import './styles.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn/components/ui/tabs'
import ButtonTab from './tabs/ButtonTab'
import IconTab from './tabs/IconTab'



export default async function HomePage() {
  // const headers = await getHeaders()
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })
  return (
    <div className="home mx-4">
      <Tabs defaultValue="button" className="w-full">
        <TabsList>
          <TabsTrigger value="button">Buttons</TabsTrigger>
          <TabsTrigger value="icon">Icons</TabsTrigger>
          <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
        </TabsList>
        <TabsContent value="button">
          <ButtonTab />
        </TabsContent>
        <TabsContent value="icon">
          <IconTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
