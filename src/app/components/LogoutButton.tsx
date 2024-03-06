"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return <button className="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700" onClick={() => signOut()}>Log out</button>;
};

export default LogoutButton;