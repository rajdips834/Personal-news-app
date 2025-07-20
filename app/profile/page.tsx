"use client";

import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (!session?.user) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 text-text">
      <h2 className="mb-2 text-xl font-bold">👤 Profile</h2>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <img
        src={session.user.image || "/user-avatar.png"}
        alt="Avatar"
        className="w-16 h-16 mt-4 rounded-full"
      />
      <button
        onClick={() => signOut()}
        className="mt-4 text-red-500 hover:underline"
      >
        Sign out
      </button>
    </div>
  );
}
