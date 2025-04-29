'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/libs/shadcn/components/ui/card'

import CommonButton from '@/libs/common/button/CommonButton'
import { useDialog } from '@/libs/common/dialog/useDialog.hook'
import ApplyJob from '../jobs/[slug]/components/ApplyJob'
import { useConfirmationDialog } from '@/libs/common/dialog/useConfirmationDialog.hook'


const DialogTab = () => {
    const { openDialog: openConfirmationDialog, DialogElement: ConfirmationDialogElement } =
        useConfirmationDialog({
            title: 'Overwrite file',
        })
    const { openDialog, closeDialog, DialogElement } = useDialog({
        title: 'Dialog Title',
        description: 'Dialog Description',
        content: (
            <ApplyJob job={
                {
                    id: '1',
                    title: 'Software Engineer',
                    description: 'We are looking for a Software Engineer to join our team.',
                    location: 'remote',
                    salary: 120000,
                    isActive: true,
                    updatedAt: '2023-10-01',
                    createdAt: '2023-10-01',
                }
            } />
        ),
        actions: [
            {
                children: 'Apply',
                variant: 'default',
                onClick: () => {
                    closeDialog()
                },
            },
        ],
        dismissible: true,

    })
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>🧱 Dialog Component Showcase </CardTitle>
                <CardDescription>
                    Explore the <code>Dialog</code> component with usage examples.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <h2 className="text-lg font-semibold mb-4">🎨 Dialog Variants</h2>

                <CommonButton
                    className="mr-5"
                    onClick={() => {
                        openDialog()
                    }}
                >
                    Open Dialog
                </CommonButton>

                <CommonButton
                    variant={'destructive'}
                    onClick={() => {
                        openConfirmationDialog()
                    }}
                >
                    Open Confirmation Dialog
                </CommonButton>
                {DialogElement}
                {ConfirmationDialogElement}
            </CardContent>
        </Card>
    )
}

export default DialogTab
