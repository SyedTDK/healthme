// This is the login page
"use client";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await signIn("credentials", loginData);
      setAlert({ status: "success", message: "Login successfully" });
      setLoginData({ email: "", password: "" });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: "error", message: "Invalid credentials. Please try again. (Email is case sensitive)" });
    } finally {
      window.location.href = "/chat/new";
    }
    
  };  

  // useEffect(() => {
  //   const redirectUser = async () => {
  //     const session = await getSession(); 
  //     if (session) {
  //       router.push("/chat/new"); // Redirect to the homepage after successful login
  //     }
  //   };

  //   redirectUser();
  // }, [router]);

  
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-lg shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="/logo.png" alt="logo" className="mx-auto w-24" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Welcome back</h2>
          </div>
          {alert.message && 
            <div style={{ 
              color: alert.status === 'success' ? 'green' : 'red',
              fontWeight: 'bold'
            }}>   
              {alert.status === 'success' ? '✅' : '❌'} {alert.message}
            </div>
          }
         <form onSubmit={onSubmit} className="space-y-6">
              <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                <div className="mt-2">
                  <input 
                    onChange={onChange}
                    value={loginData.email}  
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                  </div>
                </div>
                <div className="mt-2">
                  <input 
                    onChange={onChange}
                    value={loginData.password}
                    name="password" 
                    type="password" 
                    autoComplete="current-password" 
                    required 
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign up for free</Link>
            </p>
        </div>
      </div>
    );
  };
export default LoginPage;