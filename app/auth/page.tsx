"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = async () => {
    try {
      setLoading(true);

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        if (name) {
          await updateProfile(cred.user, { displayName: name });
        }
      }

      router.push(redirect);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(redirect);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pb-24 lg:pb-0 bg-white">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-slate-900">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        {!isLogin && (
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
        />

        <button
          onClick={handleEmailAuth}
          disabled={loading}
          className="w-full py-3 mb-4 bg-[#7a1f1f] text-white font-semibold rounded-lg hover:bg-[#5f1717] transition disabled:opacity-70"
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-sm text-center">
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <span
            className="text-[#7a1f1f] font-semibold cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </main>
  );
}
