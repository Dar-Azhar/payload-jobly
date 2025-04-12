'use client'
import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'
const ButtonComponent = (props) => {
    const { id, initialData } = useDocumentInfo();
    const fieldData = props.rowData || initialData
    const markAsActive = () => {
        const { id, ...rest } = fieldData
        const url = `/api/users/${id}`
        const data = {
            ...rest,
            active: true
        }
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, options).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        }).then(data => {
            console.log('data', data)
            window.location.reload()
        })

    }
    return (
        <button type='button' onClick={markAsActive}>Mark As Active</button>
    )
}

export default ButtonComponent