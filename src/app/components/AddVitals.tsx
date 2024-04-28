"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AddVitals() {
    const { data: session, status } = useSession();
    const userId = parseInt(session?.user?.id || '0');
    const [showOptions, setShowOptions] = useState(false);
    const [showTemperature, setShowTemperature] = useState(false);
    const [showBloodPressure, setShowBloodPressure] = useState(false);
    const [showCholesterol, setShowCholesterol] = useState(false);
    const [showWeight, setShowWeight] = useState(false);
    const [showMenstruation, setShowMenstruation] = useState(false);
    const [value, setValue] = useState('');
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [flow, setFlow] = useState('');
    const [color, setColor] = useState('');
    const [consistency, setConsistency] = useState('');
    const [isSaving, setIsSaving] = useState<boolean>(false);
    
    const submitMenstruation = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const vitalType = 'menstruation';
        try {
            const body = { userId, type: vitalType, value, systolic, diastolic, flow, color, consistency };
            await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
            setFlow('');
            setColor('');
            setConsistency('');
            setShowMenstruation(false);
            window.location.reload();
    }
    };
    const submitBloodPressure = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const vitalType = 'bloodPressure';
        try {
            const body = { userId, type: vitalType, value, systolic, diastolic, flow, color, consistency };
            await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
            setSystolic('');
            setDiastolic('');
            setShowBloodPressure(false);
            window.location.reload();
        }
    }
    const submitTemperature = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const vitalType = 'temperature';
        try {
        const body = { userId, type: vitalType, value, systolic, diastolic, flow, color, consistency };
        await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        } catch (error) {
        console.log(error);
        } finally {
            setIsSaving(false);
            setValue('');
            setShowTemperature(false);
            window.location.reload();
        }
    }
    const submitWeight = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const vitalType = 'weight';
        try {
          const body = { userId, type: vitalType, value, systolic, diastolic, flow, color, consistency };
          await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
          });
        } catch (error) {
          console.log(error);
        } finally {
            setIsSaving(false);
            setValue('');
            setShowWeight(false);
            window.location.reload();
        }
    }
    const submitCholesterol = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const vitalType = 'cholesterol';
        try {
          const body = { userId, type: vitalType, value, systolic, diastolic, flow, color, consistency };
          await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
          });
        } catch (error) {
          console.log(error);
        } finally {
            setIsSaving(false);
            setValue('');
            setShowCholesterol(false);
            window.location.reload();
        }
    }

      return (
        <>
            <button
                className=" border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
                type="button"
                onClick={() => setShowOptions(true)}
            >
                + Add New Vital
            </button>
            {showOptions ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add New Vitals
                                    </h3>
                                    <button
                                        className="p-1 ml-auto float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowOptions(false)}
                                    >
                                        <span className=" text-red-600 h-6 w-6 block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto flex items-center">
                                    <div className="flex flex-col items-center m-2">
                                        <button
                                            className="flex items-center justify-center p-1 rounded-lg bg-gray-700 text-white"
                                            type="button"
                                            onClick={() => {
                                                setShowTemperature(true);
                                                setShowOptions(false);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-thermometer mb-2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                                        </button>
                                        <p className='text-sm'>Temperature</p>
                                    </div>
                                    <div className="flex flex-col items-center m-2">
                                    <button
                                        className="flex items-center justify-center p-2 rounded-lg bg-gray-700 text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowBloodPressure(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart-pulse"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>                    
                                    </button>
                                        <p className='text-sm'>Blood Pressure</p>
                                        </div>
                                    <div className="flex flex-col items-center m-2">
                                    <button
                                        className="flex items-center justify-center p-2 rounded-lg bg-gray-700 text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowCholesterol(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sandwich"><path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/><path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83"/><path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z"/><path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z"/></svg>
                                    </button>
                                        <p className='text-sm'>Cholesterol</p>
                                    </div>
                                    <div className="flex flex-col items-center m-2">
                                    <button
                                        className="flex items-center justify-center p-2 rounded-lg bg-gray-700 text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowWeight(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-weight"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/></svg>

                                    </button>
                                        <p className='text-sm'>Weight</p>
                                    </div>
                                    <div className="flex flex-col items-center m-2">
                                    <button
                                        className="flex items-center justify-center p-2 rounded-lg bg-gray-700 text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowMenstruation(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>

                                    </button>
                                        <p className='text-sm'>Menstruation</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {showTemperature ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Temperature
                                    </h3>
                                    
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={submitTemperature}>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="value">
                                                Temperature
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="value"
                                                type="text"
                                                placeholder="°F"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowTemperature(false)}
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
                    </div>
                </>
            ) : null}
            {showBloodPressure ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Blood Pressure
                                    </h3>
                                   
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={submitBloodPressure}>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="systolic">
                                                Systolic
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="systolic"
                                                type="text"
                                                placeholder="Enter systolic"
                                                value={systolic}
                                                onChange={(e) => setSystolic(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="diastolic">
                                                Diastolic
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="diastolic"
                                                type="text"
                                                placeholder="Enter diastolic"
                                                value={diastolic}
                                                onChange={(e) => setDiastolic(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowBloodPressure(false)}
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {showCholesterol ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Cholesterol
                                    </h3>
                                    
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={submitCholesterol}>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="value">
                                                Total Cholesteroal
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="value"
                                                type="text"
                                                placeholder="mg/dL"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowCholesterol(false)}
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {showWeight ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Weight
                                    </h3>
                                    
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={submitWeight}>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="value">
                                                Weight
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="value"
                                                type="text"
                                                placeholder="lb"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowWeight(false)}
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {showMenstruation ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Menstruation
                                    </h3>
                                    
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={submitMenstruation}>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="flow">
                                                Flow
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="flow"
                                                type="text"
                                                placeholder="Light, Medium, Heavy"
                                                value={flow}
                                                onChange={(e) => setFlow(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="color">
                                                Color
                                            </label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="color"
                                                type="text"
                                                placeholder="Black, Red, Brown, Pink, etc."
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)} 
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-white text-sm font-bold mb-2" htmlFor="consistency">
                                                Consistency
                                            </label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                                                id="consistency"
                                                type="text"
                                                placeholder="Watery, Clots, etc."
                                                value={consistency}
                                                onChange={(e) => setConsistency(e.target.value)} 
                                            />
                                        </div>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowMenstruation(false)}
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );


}
