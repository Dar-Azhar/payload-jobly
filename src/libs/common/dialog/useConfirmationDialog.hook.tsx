/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogConfig, useDialog } from './useDialog.hook'

export interface UseConfirmationDialogProps extends Partial<DialogConfig> {
    onConfirm?: (e: any) => void
    closeOnConfirm?: boolean
}
export function useConfirmationDialog(config?: UseConfirmationDialogProps) {
    const { title, description, closeOnConfirm = true, onConfirm } = config || {}

    const { openDialog, DialogElement, closeDialog } = useDialog({
        title: title || 'Are you sure?',
        description: description || 'This action cannot be undone.',
        actions: [
            {
                children: 'Confirm',
                variant: 'default',
                onClick: (event) => {
                    if (onConfirm) {
                        onConfirm(event)
                    } else {
                        closeDialog()
                    }
                    if (closeOnConfirm) {
                        closeDialog()
                    }
                },
            },
        ],
        ...config,
    })

    return { openDialog, DialogElement }
}
