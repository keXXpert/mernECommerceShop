import React from 'react'
import { Alert } from 'react-bootstrap'

interface MessagePropsType {
    variant: string,
    children: React.ReactNode
}

export const Message = ({ variant = 'info', children }: MessagePropsType) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}