"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AddMedication() {
    const { data: session, status } = useSession();
    const userId = parseInt(session?.user?.id || '0');
    const [showModal, setShowModal] = React.useState(false);
    const [name, setName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [dose, setDose] = useState('');
    const [frequency, setFrequency] = useState('');
    
    
    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
          const body = { userId, name, instructions, dose, frequency};
          await fetch('/api/saveMedication', {
            method: 'POST',
            body: JSON.stringify(body),
          });
        } catch (error) {
          console.log(error);
        } finally {
            setIsSaving(false);
            setName('');
            setInstructions('');
            setDose('');
            setFrequency('');
            setShowModal(false);
            window.location.reload();
        }
      };
    return (
        <>
            <button
                className=" border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
                type="button"
                onClick={() => setShowModal(true)}
            >
                + Add New Medication
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
                                        Add New Medication
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
                                <form onSubmit={submitData} className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medication Name</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                onChange={(e) => setName(e.target.value)}
                                                value={name} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                                placeholder="Medication Name" 
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="dose" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dose</label>
                                            <input 
                                                type="text" 
                                                name="dose"
                                                onChange={(e) => setDose(e.target.value)}
                                                value={dose}  
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                                placeholder="X tablets/capsules/teaspoons etc." 
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequency</label>
                                            <input 
                                                type="text" 
                                                name="frequency"
                                                onChange={(e) => setFrequency(e.target.value)}
                                                value={frequency}  
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                                placeholder="X times a day / week / month or every X hours or when needed" 
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                            <textarea 
                                                rows={4}
                                                name="instructions"
                                                onChange={(e) => setInstructions(e.target.value)}
                                                value={instructions} 
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Provide instructions for the medications. Include specific times, duration, and end date etc.">
                                            </textarea>                    
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit" 
                                        value="Submit"
                                    >
                                        {isSaving && <span>Saving...</span>}
                                        {!isSaving && <span>Save</span>}
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}