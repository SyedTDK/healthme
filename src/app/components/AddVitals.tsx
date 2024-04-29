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
    const [type, setType] = useState('');
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
        setType('menstruation');
        try {
            const body = { userId, type, value, systolic, diastolic, flow, color, consistency };
            await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
            setType('');
            setFlow('');
            setColor('');
            setConsistency('');
            setShowMenstruation(false);
    }
    };
    const submitBloodPressure = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setType('bloodPressure');
        try {
            const body = { userId, type, value, systolic, diastolic, flow, color, consistency };
            await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
            setType('');
            setSystolic('');
            setDiastolic('');
            setShowBloodPressure(false);
        }
    }
    const submitTemperature = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setType('temperature');
        try {
        const body = { userId, type, value, systolic, diastolic, flow, color, consistency };
        await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        } catch (error) {
        console.log(error);
        } finally {
            setIsSaving(false);
            setType('');
            setValue('');
            setShowTemperature(false);
        }
    }
    const submitWeight = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setType('weight');
        try {
          const body = { userId, type, value, systolic, diastolic, flow, color, consistency };
          await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
          });
        } catch (error) {
          console.log(error);
        } finally {
            setIsSaving(false);
            setType('');
            setValue('');
            setShowWeight(false);
        }
    }
    const submitCholesterol = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setType('cholesterol');
        try {
          const body = { userId, type, value, systolic, diastolic, flow, color, consistency };
          await fetch('/api/saveVitals', {
            method: 'POST',
            body: JSON.stringify(body),
          });
        } catch (error) {
          console.log(error);
        } finally {
            setIsSaving(false);
            setType('');
            setValue('');
            setShowCholesterol(false);
        }
    }

      return (
        <>
            <button
                className="mb-2 text-2xl font-bold tracking-tight text-white"
                type="button"
                onClick={() => setShowOptions(true)}
            >
                Add New Vitals
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
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowOptions(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <button
                                        className="mb-2 text-2xl font-bold tracking-tight text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowTemperature(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                        Temperature
                                    </button>
                                    <button
                                        className="mb-2 text-2xl font-bold tracking-tight text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowBloodPressure(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                        Blood Pressure
                                    </button>
                                    <button
                                        className="mb-2 text-2xl font-bold tracking-tight text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowCholesterol(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                        Cholesterol
                                    </button>
                                    <button
                                        className="mb-2 text-2xl font-bold tracking-tight text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowWeight(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                        Weight
                                    </button>
                                    <button
                                        className="mb-2 text-2xl font-bold tracking-tight text-white"
                                        type="button"
                                        onClick={() => {
                                            setShowMenstruation(true);
                                            setShowOptions(false);
                                        }}
                                    >
                                        Menstruation
                                    </button>
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
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowTemperature(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
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
                                        <button
                                            className="mb-2 text-2xl font-bold tracking-tight text-white"
                                            type="submit"
                                        >
                                            Save
                                        </button>
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
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowBloodPressure(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
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
                                            className="mb-2 text-2xl font-bold tracking-tight text-white"
                                            type="submit"
                                        >
                                            Save
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
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowCholesterol(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
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
                                            className="mb-2 text-2xl font-bold tracking-tight text-white"
                                            type="submit"
                                        >
                                            Save
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
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowWeight(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
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
                                            className="mb-2 text-2xl font-bold tracking-tight text-white"
                                            type="submit"
                                        >
                                            Save
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
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowMenstruation(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
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
                                            className="mb-2 text-2xl font-bold tracking-tight text-white"
                                            type="submit"
                                        >
                                            Save
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
