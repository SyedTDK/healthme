// Note: This is the register page
"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


const RegisterPage = () => {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
      };
    
    const [alert, setAlert] = useState({
        status: '',
        message: ''
    })
    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
          await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(registerData)
          })
          setAlert({ status: 'success', message: 'Signup successfully' })
          setRegisterData({ name: '', email: '', password: '' })
        } catch (error : any) {
          console.log({ error })
          setAlert({ status: 'error', message: 'Something went wrong'})
        }
    }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg shadow-md">
        <h2 className="text-center mb-8">Create an Account</h2>
        {alert.message && 
          <div style={{ 
              color: alert.status === 'success' ? 'green' : 'red',
              fontWeight: 'bold'
          }}>   
              {alert.status === 'success' ? '✅' : '❌'} {alert.message}
          </div>
        }
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Name </label>
            <input
              className="input input-bordered w-full max-w-xs opacity-25 text-black"
              onChange={onChange}
              value={registerData.name} 
              name="name"
              type="text" 
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email </label>
            <input
              className="input input-bordered w-full max-w-xs opacity-25 text-black"
              onChange={onChange}
              value={registerData.email} 
              name="email" 
              type="email" 
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password </label>
            <input
              className="input input-bordered w-full max-w-xs opacity-25 text-black" 
              onChange={onChange}
              value={registerData.password}
              name="password" 
              type="password" 
              required 
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 rounded bg-indigo-600 text-white cursor-pointer">Create account</button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
              Already signed up?
              <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</Link>
        </p>
        </div>
    </div>
  );
};

export default RegisterPage;