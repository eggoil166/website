import React from 'react';
import { appMap } from '../lib/pages';

interface ApplicationProps {
    activeApp: string | null;
    setActiveApp: (name: string | null) => void;
}

export default function Application({ activeApp, setActiveApp }: ApplicationProps) {
    if (!activeApp) {
        return (
            <div
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    position: 'fixed',
                    left: '45vh',
                    top: '8vh',
                    textOrientation: 'mixed',
                    borderColor: '#6ee7b7',
                    borderWidth: '2px',
                    borderRadius: '8px',
                    width: '68vw',
                    height: '55vh'
                }}
                className="mt-4 mb-4 ml-2 mr-2 flex">
                <div className='bg-blue-500 flex h-full w-full rounded-lg'></div>
            </div>
        )
    }

    const content = appMap[activeApp] || (
        <div className="p-4 text-green-200">
            <p>unknown: {activeApp}</p>
        </div>
    )

    return (
        <div
            style={{
                textDecoration: 'none',
                color: 'inherit',
                position: 'fixed',
                left: '45vh',
                top: '8vh',
                textOrientation: 'mixed',
                borderColor: '#6ee7b7',
                borderWidth: '2px',
                borderRadius: '8px',
                width: '68vw',
                height: '55vh'
            }}
            className="mt-4 mb-4 ml-2 mr-2 flex">
            <div className="flex-1 overflow-y-auto">{content}</div>
        </div>
    )
}