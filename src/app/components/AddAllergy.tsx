"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AddAllergy() {
    const { data: session, status } = useSession();
    const userId = parseInt(session?.user?.id || '0');
    const [showModal, setShowModal] = React.useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [medications, setMedications] = useState('');
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const body = { userId, name, type, description, medications };
            await fetch('/api/saveAllergy', {
                method: 'POST',
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
            setName('');
            setType('');
            setDescription('');
            setMedications('');
            setShowModal(false);
            window.location.reload();
        }
    }
    return (
        <>
            <button
                className=" border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
                type="button"
                onClick={() => setShowModal(true)}
            >
                + Add New Allergy
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add New Allergy
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={submitData}>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="type">
                                                Allergy Type
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="type"
                                                type="text"
                                                placeholder="Dust, Pollen, etc."
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                                                Allergen Name
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="name"
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
                                                Description
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="description"
                                                type="text"
                                                placeholder="Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="medications">
                                                Medications
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="medications"
                                                type="text"
                                                placeholder="Medications"
                                                value={medications}
                                                onChange={(e) => setMedications(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                {isSaving ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}