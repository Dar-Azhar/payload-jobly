import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/libs/shadcn/components/ui/dialog"
import { useState } from "react"
import CommonButton, { CommonButtonProps } from "../button/CommonButton"
import { cn } from "@/libs/shadcn/lib/utils"
import { ScrollArea, ScrollBar } from "@/libs/shadcn/components/ui/scroll-area"
export interface DialogConfig {
    title: string | React.ReactNode,
    description?: string | React.ReactNode,
    content?: string | React.ReactNode,
    actions?: CommonButtonProps[],
    dismissible?: boolean,
    contentClassName?: string | 'min-w-screen',
    padding?: string,
    hideCloseAction?: boolean
    scroll?:
    | boolean
    | {
        maxHeight?: string
        className?: string
    }
}
export const useDialog = (config: DialogConfig) => {
    const [open, setOpen] = useState<boolean>(false)
    const openDialog = () => setOpen(true)
    const closeDialog = () => setOpen(false)
    const { title, description, content, actions, dismissible = true, contentClassName, padding, hideCloseAction, scroll = true } = config
    const DialogElement = open ? (
        <Dialog open={open}
            onOpenChange={(o) => {
                if (!o) {
                    closeDialog()
                }
            }}>
            <DialogContent className={cn(
                'flex flex-col max-h-screen',
                padding,
                !dismissible && '[&>button]:hidden',
                contentClassName,
            )}
                onInteractOutside={(e) => {
                    e.preventDefault()

                    // remove this line if you are facing issues when two dialogs are open, this causes problem, in that case this
                    // needs to be handled differently
                    // for now, if we want to show two dialogs, we need to set dismissible to true to first dialog
                    if (dismissible) {
                        closeDialog()
                    }
                }}
                onEscapeKeyDown={(e) => {
                    e.preventDefault()
                    if (dismissible) {
                        closeDialog()
                    }
                }}
            >
                {(title || description) && (<DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>)}

                {content && (
                    <div
                        className={cn(
                            'flex-1 relative',
                            scroll && 'overflow-hidden',
                            scroll && typeof scroll === 'object' && scroll.className,
                        )}
                    >
                        {scroll ? (
                            <ScrollArea className="grid" type="scroll">
                                <div
                                    className="relative"
                                    style={{ maxHeight: typeof scroll === 'object' ? scroll.maxHeight : '80vh' }}
                                >
                                    {content}
                                </div>
                                <ScrollBar orientation="vertical" />
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        ) : (
                            content
                        )}
                    </div>
                )}
                <DialogFooter>
                    {!hideCloseAction && (
                        <CommonButton
                            variant="secondary"
                            onClick={(e) => {
                                e.preventDefault()
                                closeDialog()
                            }}
                        >
                            Close
                        </CommonButton>
                    )}
                    {actions && actions.map((action, key) => <CommonButton key={key} {...action} />)}
                </DialogFooter>

            </DialogContent>
        </Dialog>
    ) : null

    return { openDialog, closeDialog, DialogElement }
}
