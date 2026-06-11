import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function History() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response = await api.get(
        "/history/"
      );

      setHistory(

        response.data.sort(

          (a, b) =>

            new Date(b.created_at) -

            new Date(a.created_at)

        )

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}

      <div className="flex items-center gap-5 mb-10">

        <button
          className="
          bg-blue-600
          hover:bg-blue-700
          px-5
          py-2
          rounded-xl
          shadow-lg
          "
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">
          Review History
        </h1>

      </div>

      {

        history.map((item) => (

          <div
            key={item.id}
            className="
            bg-gradient-to-br
            from-slate-800
            to-slate-900
            border
            border-slate-700
            rounded-2xl
            p-8
            mb-8
            shadow-2xl
            hover:border-blue-500
            hover:scale-[1.01]
            transition-all
            duration-300
            "
          >

            {/* Top */}

            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold text-blue-400">

                {item.language.toUpperCase()}

              </h2>

              <span
                className="
                bg-blue-600
                px-4
                py-2
                rounded-full
                text-sm
                "
              >

                Review #{item.id}

              </span>

            </div>


            {/* Date */}

            <p className="mt-4 text-gray-400">

              📅

              {" "}

              {

                new Date(
                  item.created_at
                ).toLocaleString()

              }

            </p>


            {/* Source Code */}

            <div className="mt-8">

              <div className="flex justify-between items-center">

                <h3 className="font-bold text-xl">

                  Source Code

                </h3>

                <button
                  className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-3
                  py-2
                  rounded-lg
                  "
                  onClick={() => {

                    navigator.clipboard.writeText(
                      item.source_code
                    );

                    toast.success(
                      "Source code copied!"
                    );

                  }}
                >

                  📋 Copy Source

                </button>

              </div>

              <pre
                className="
                bg-black
                p-5
                rounded-xl
                overflow-auto
                text-green-400
                mt-4
                border
                border-slate-700
                shadow-inner
                max-h-[250px]
                whitespace-pre-wrap
                "
              >

                {item.source_code}

              </pre>

            </div>


            {/* Optimized Code */}

            <div className="mt-8">

              <div className="flex justify-between items-center">

                <h3 className="font-bold text-xl">

                  Optimized Code

                </h3>

                <button
                  className="
                  bg-green-600
                  hover:bg-green-700
                  px-3
                  py-2
                  rounded-lg
                  "
                  onClick={() => {

                    navigator.clipboard.writeText(
                      item.optimized_code
                    );

                    toast.success(
                      "Optimized code copied!"
                    );

                  }}
                >

                  📋 Copy Optimized

                </button>

              </div>

              <pre
                className="
                bg-black
                p-5
                rounded-xl
                overflow-auto
                text-green-400
                mt-4
                border
                border-slate-700
                shadow-inner
                max-h-[250px]
                whitespace-pre-wrap
                "
              >

                {item.optimized_code}

              </pre>

            </div>

          </div>

        ))

      }

    </div>

  );

}