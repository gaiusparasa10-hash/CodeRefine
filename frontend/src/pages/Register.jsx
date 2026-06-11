import { useState } from "react";

import api from "../services/api";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    setLoading(true);

    try {

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      toast.success(
        "Registration Successful!"
      );

      navigate("/");

    }

    catch {

      toast.error(
        "Registration Failed"
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

            Create your account

          </p>

        </div>

        <div className="space-y-5">

          <input
            placeholder="Full Name"
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-4
            text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
            onChange={(e)=>
              setName(e.target.value)
            }
          />

          <input
            placeholder="Email"
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-4
            text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
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
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
            onChange={(e)=>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="
            w-full
            bg-green-600
            hover:bg-green-700
            rounded-xl
            p-4
            font-bold
            text-white
            "
          >

            {

              loading

              ?

              "Creating..."

              :

              "Create Account"

            }

          </button>

        </div>

        <div className="mt-8 text-center">

          <p className="text-gray-400">

            Already have an account?

          </p>

          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300"
          >

            Sign In

          </Link>

        </div>

      </div>

    </div>

  );

}