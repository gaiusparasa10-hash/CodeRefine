import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    setLoading(true);

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      toast.success(
        "Login Successful!"
      );

      navigate("/dashboard");

    }

    catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Login Failed"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 w-[430px] rounded-3xl p-10 shadow-2xl border border-slate-700">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-white">

            CodeRefine 🚀

          </h1>

          <p className="text-gray-400 mt-3">

            AI-Powered Code Review Platform

          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-4
            text-white
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-4
            text-white
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "
            onChange={(e)=>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            rounded-xl
            p-4
            font-bold
            text-white
            "
          >

            {

              loading

              ?

              "Signing In..."

              :

              "Sign In"

            }

          </button>

        </div>

        <div className="mt-8 text-center">

          <p className="text-gray-400">

            Don't have an account?

          </p>

          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >

            Create Account

          </Link>

        </div>

      </div>

    </div>

  );

}