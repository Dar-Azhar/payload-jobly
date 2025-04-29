/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { Button } from '@/libs/shadcn/components/ui/button'
import CommonIcon, { CommonIconProps } from '@/libs/common/icon/CommonIcon'
import { useConfirmationDialog, UseConfirmationDialogProps } from '../dialog/useConfirmationDialog.hook'
interface ButtonIconProps extends CommonIconProps {
    /** Where to place the icon */
    position?: 'left' | 'right'
}
interface ButtonEndpointProps {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    headers?: Record<string, string>
    credentials?: 'include' | 'omit' | 'same-origin'
    body?: any
    onSuccess?: (data: any) => void
    onError?: (error: any) => void
    confirm?: boolean | UseConfirmationDialogProps
}
export interface CommonButtonProps extends React.ComponentProps<typeof Button> {
    /** Shows spinner & disables the button */
    loading?: boolean
    /** Icon shorthand – string name or the full object */
    icon?: CommonIconProps['name'] | ButtonIconProps

    confirm?: boolean | UseConfirmationDialogProps

    endpoint?: string | ButtonEndpointProps
}

/** Spinner icon used while loading */
const LOADER_ICON: ButtonIconProps = {
    name: 'loader-2',
    position: 'left',
    className: 'animate-spin',
}

/** Ensure whatever the caller passed becomes a fully‑formed ButtonIconProps */
function normalizeIcon(icon?: CommonButtonProps['icon']): ButtonIconProps | undefined {
    if (!icon) return undefined
    return typeof icon === 'string' ? { name: icon, position: 'left' } : { position: 'left', ...icon }
}

function isConfirmEnabled(endpoint?: string | ButtonEndpointProps): boolean {
    return typeof endpoint !== 'object' || endpoint.confirm !== false
}

const CommonButton: React.FC<CommonButtonProps> = ({
    icon,
    children,
    disabled,
    variant,
    size,
    confirm,
    endpoint,
    onClick,
    ...props
}: CommonButtonProps) => {
    const [loading, setLoading] = React.useState<boolean | undefined>(props.loading)

    const iconProps = loading ? LOADER_ICON : normalizeIcon(icon)
    const iconOnly = !React.Children.count(children)

    const { openDialog: openConfirmationDialog, DialogElement: ConfirmationDialogElement } =
        useConfirmationDialog({
            onConfirm: (e) => {
                onClick?.(e)
            },
            ...(typeof confirm === 'object' ? confirm : {})

        })

    const {
        openDialog: openEndpointConfirmationDialog,
        DialogElement: EndpointConfirmationDialogElement,
    } = useConfirmationDialog({
        onConfirm: async () => {
            console.debug('should trigger after endpoint request confirm')
            await sendRequest(endpoint)
        },
        closeOnConfirm: true,
        ...(typeof endpoint === 'object' && typeof endpoint.confirm === 'object'
            ? endpoint.confirm
            : {}),
    })

    const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // Preference is given to endpoint confirmation dialog, then endpoint request, then simple onClick
        if (endpoint) {
            if (isConfirmEnabled(endpoint)) {
                openEndpointConfirmationDialog()
            } else {
                await sendRequest(endpoint)
            }
        } else if (!endpoint && !!confirm) {
            console.debug('endpoint isn not present but confirm is present')
            openConfirmationDialog()
        } else {
            console.debug('simple onClick')

        }
    }

    const sendRequest = async (endpoint: CommonButtonProps['endpoint']) => {
        if (endpoint) {
            const endpointProps: ButtonEndpointProps =
                typeof endpoint === 'string' ? { url: endpoint, method: 'GET' } : endpoint

            const headers = endpointProps.headers ?? {
                'Content-Type': 'application/json',
            }

            setLoading(true)
            fetch(endpointProps.url, {
                method: endpointProps.method,
                headers,
                credentials: endpointProps?.credentials ?? undefined,
                body: endpointProps?.body ? JSON.stringify(endpointProps.body) : undefined,
            })
                .then(async (response) => {
                    if (response.ok) {
                        // Parse the response JSON
                        const data = await response.json()
                        endpointProps.onSuccess?.(data) // Pass the parsed data to the success handler
                        // Optionally, show a success toast message
                    } else {
                        // Handle non-2xx HTTP responses
                        const errorData = await response.json() // Get error details if available
                        const error = new Error('Request failed with status ' + response.status)
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        error['data'] = errorData // Attach the response data for more context
                        throw error // This will be caught in the catch block
                    }
                })
                .catch((error) => {
                    endpointProps.onError?.(error) // Pass the error to the error handler
                    // Optionally, log the error or show a toast message
                    console.error('Fetch error:', error)
                })
                .finally(() => {
                    setLoading(false) // Ensure loading state is reset
                })
        }
    }

    return (
        <>
            <Button
                disabled={loading || disabled}
                variant={iconOnly && !variant ? 'outline' : variant}
                size={iconOnly && !size ? 'icon' : size}
                onClick={onClickHandler}
                {...props}
            >
                {/* icon – left */}
                {iconProps && iconProps.position !== 'right' && <CommonIcon {...iconProps} />}

                {children}

                {/* icon – right */}
                {iconProps && iconProps.position === 'right' && <CommonIcon {...iconProps} />}
            </Button>
            {endpoint && EndpointConfirmationDialogElement}
            {confirm && ConfirmationDialogElement}
        </>
    )
}
export default CommonButton
