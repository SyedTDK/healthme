"use client";
import { useState } from 'react';
export default function DeleteData({dataId, type}: {dataId: number, type: string}) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsDeleting(true);
        e.preventDefault();
        try {
            const body = { type: type, dataId: dataId };
            await fetch('/api/deleteData', {
                method: 'DELETE',
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        } finally {
            // Refresh the page after deleting the data
            window.location.reload();
        }
    }
    return (
        <button 
            onClick={handleDelete}
            className="flex text-red-600"
        >
            {isDeleting ? 'Deleting...' : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>}
            
        </button>
    )
}