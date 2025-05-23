/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/shadcn/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn/components/ui/tabs'
import { Separator } from '@/libs/shadcn/components/ui/separator'

import CommonButton from '@/libs/common/button/CommonButton'
import CommonIcon from '@/libs/common/icon/CommonIcon'

export interface ButtonsTabProps {
    /**
     * Optional string prop for demonstration purposes.
     */
    someProp?: string
}

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted text-sm p-3 rounded-md mt-2 mb-6 overflow-x-auto">
        <code>{children}</code>
    </pre>
)

const ButtonsTab = ({ someProp }: ButtonsTabProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>🧱 Button Component Showcase</CardTitle>
                <CardDescription>
                    Explore all available variants of the <code>CommonButton</code> component with usage
                    examples.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="default" className="w-full">
                    <TabsList className="flex flex-wrap justify-start p-1 space-x-1 mb-4">
                        <TabsTrigger value="default">Variants</TabsTrigger>
                        <TabsTrigger value="icons">Icons</TabsTrigger>
                        <TabsTrigger value="iconChildren">Icon + Text</TabsTrigger>
                        <TabsTrigger value="loading">Loading</TabsTrigger>
                        <TabsTrigger value="confirm">Confirm</TabsTrigger>
                        <TabsTrigger value="endpoint">Endpoint</TabsTrigger>
                    </TabsList>

                    {/* --- VARIANTS --- */}
                    <TabsContent value="default">
                        <h2 className="text-lg font-semibold mb-4">🎨 Button Variants</h2>

                        <div>
                            <CommonButton>Default</CommonButton>
                            <CodeBlock>{`<CommonButton>Default</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton variant="outline">Outline</CommonButton>
                            <CodeBlock>{`<CommonButton variant="outline">Outline</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton variant="secondary">Secondary</CommonButton>
                            <CodeBlock>{`<CommonButton variant="secondary">Secondary</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton variant="destructive">Destructive</CommonButton>
                            <CodeBlock>{`<CommonButton variant="destructive">Destructive</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton variant="ghost">Ghost</CommonButton>
                            <CodeBlock>{`<CommonButton variant="ghost">Ghost</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton variant="link">Link</CommonButton>
                            <CodeBlock>{`<CommonButton variant="link">Link</CommonButton>`}</CodeBlock>
                        </div>
                    </TabsContent>

                    {/* --- ICON BUTTONS --- */}
                    <TabsContent value="icons">
                        <h2 className="text-lg font-semibold mb-4">🔘 Icon Buttons</h2>

                        <div>
                            <CommonButton variant="outline" size="icon">
                                <CommonIcon name="chevron-down" />
                            </CommonButton>
                            <CodeBlock>{`<CommonButton variant="outline" size="icon">\n  <CommonIcon name="chevron-down" />\n</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton icon="chevron-up" />
                            <CodeBlock>{`<CommonButton icon="chevron-up" />`}</CodeBlock>
                        </div>
                    </TabsContent>

                    {/* --- ICON + TEXT --- */}
                    <TabsContent value="iconChildren">
                        <h2 className="text-lg font-semibold mb-4">📝 Icon + Text</h2>

                        <div>
                            <CommonButton icon="sandwich">With sandwich icon</CommonButton>
                            <CodeBlock>{`<CommonButton icon="sandwich">With sandwich icon</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton
                                icon={{
                                    name: 'salad',
                                    position: 'right',
                                }}
                            >
                                Salad icon on right
                            </CommonButton>
                            <CodeBlock>{`<CommonButton icon="salad" iconPosition="right">\n  Salad icon on right\n</CommonButton>`}</CodeBlock>
                        </div>
                    </TabsContent>

                    {/* --- LOADING --- */}
                    <TabsContent value="loading">
                        <h2 className="text-lg font-semibold mb-4">⏳ Loading State</h2>

                        <div>
                            <CommonButton loading>Loading</CommonButton>
                            <CodeBlock>{`<CommonButton loading>Loading</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton
                                icon={{
                                    name: 'salad',
                                    position: 'right',
                                }}
                                loading
                            >
                                Loading with icon
                            </CommonButton>
                            <CodeBlock>{`<CommonButton icon="salad" loading iconPosition="right">\n  Loading with icon\n</CommonButton>`}</CodeBlock>
                        </div>

                        <div>
                            <CommonButton loading />
                            <CodeBlock>{`<CommonButton loading />`}</CodeBlock>
                        </div>
                    </TabsContent>

                    {/* --- CONFIRM --- */}

                    <TabsContent value="confirm">
                        <CommonButton confirm={true}
                            variant="destructive"
                            onClick={() => {
                                alert('Confirmed!')
                            }}
                        >Confirm
                        </CommonButton>


                        <CommonButton
                            className={'m-5'}
                            confirm={{
                                title: 'Confirm Action',
                                description: 'Are you sure you want to proceed?',
                            }}
                            onClick={() => {
                                alert('confirmed')
                            }}
                        >
                            Confirm with confirm object
                        </CommonButton>
                    </TabsContent>

                    {/* --- ENDPOINT --- */}
                    <TabsContent value="endpoint">
                        <CommonButton endpoint={'/endpoint'}>endpoint with simple props</CommonButton>

                        <CommonButton
                            className={'m-5'}
                            endpoint={{
                                url: '/endpoint',
                                method: 'POST',
                                confirm: {
                                    title: 'Confirm Action',
                                    description: 'Are you sure you want to proceed?',
                                },
                                onSuccess: (data) => {
                                    alert('success')
                                },
                                onError: (error) => {
                                    alert('error')
                                },
                            }}
                        >
                            endpoint with endpoint object
                        </CommonButton>

                        <CommonButton
                            className={'m-5'}
                            icon={{
                                name: 'trash',
                            }}
                            variant={'destructive'}
                            endpoint={{
                                url: '/endpoint',
                                method: 'POST',
                                confirm: false,
                                onSuccess: (data) => {
                                    alert('success')
                                },
                                onError: (error) => {
                                    alert('error')
                                },
                            }}
                        />
                    </TabsContent>

                </Tabs>

                <Separator className="my-6" />

                {/* --- PROPS DOCUMENTATION --- */}
                <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-2">📘 Props Documentation</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <code>variant</code>{' '}
                            <em>(&apos;default&apos; | &apos;outline&apos; | &apos;secondary&apos; | &apos;destructive&apos; | &apos;ghost&apos; | &apos;link&apos;)</em>
                            <br />
                            Defines the style of the button.
                        </li>
                        <li>
                            <code>icon</code> <em>(string)</em>
                            <br />
                            Name of the icon to display (when not using children).
                        </li>
                        <li>
                            <code>iconPosition</code> <em>(&apos;left&apos; | &apos;right&apos;)</em>
                            <br />
                            Controls the position of the icon relative to the button text.
                        </li>
                        <li>
                            <code>loading</code> <em>(boolean)</em>
                            <br />
                            Replaces the icon with a spinner when true.
                        </li>
                        <li>
                            <code>size</code> <em>(&apos;default&apos; | &apos;icon&apos;)</em>
                            <br />
                            Use <code>icon</code> size for square icon-only buttons.
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

export default ButtonsTab
