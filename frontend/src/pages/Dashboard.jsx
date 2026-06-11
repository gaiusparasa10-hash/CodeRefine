import { useState } from "react";

import toast from "react-hot-toast";

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { oneDark }
from "react-syntax-highlighter/dist/esm/styles/prism";

import api from "../services/api";

import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import PdfExport from "../components/PdfExport";

export default function Dashboard() {

  const [code, setCode] = useState("");

  const [language, setLanguage] =
    useState("python");

  const [review, setReview] =
    useState(null);

  const [rewrite, setRewrite] =
    useState(null);

  const [loadingReview, setLoadingReview] =
    useState(false);

  const [loadingRewrite, setLoadingRewrite] =
    useState(false);



  const handleReview = async () => {

    setLoadingReview(true);

    try {

      const response =
        await api.post(
          "/review/",
          {
            language,
            code
          }
        );

      setReview(
        response.data
      );

      setRewrite(
        null
      );

      toast.success(
        "Code analysis completed!"
      );

    }

    catch {

      toast.error(
        "Review Failed!"
      );

    }

    finally {

      setLoadingReview(
        false
      );

    }

  };



  const handleRewrite = async () => {

    setLoadingRewrite(
      true
    );

    try {

      const response =
        await api.post(
          "/rewrite/",
          {
            language,
            code
          }
        );

      setRewrite(
        response.data
      );

      setReview(
        null
      );

      toast.success(
        "Code rewritten successfully!"
      );

    }

    catch (error) {

      toast.error(

        error.response?.data?.detail ||

        error.message

      );

    }

    finally {

      setLoadingRewrite(
        false
      );

    }

  };



  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <Navbar />



      {/* Language */}

      <div className="mb-4">

        <select

          className="
          bg-slate-900
          border
          border-slate-700
          rounded-lg
          px-4
          py-2
          text-white
          shadow-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "

          value={language}

          onChange={(e) =>
            setLanguage(
              e.target.value
            )
          }

        >

          <option value="python">
            Python
          </option>

          <option value="javascript">
            JavaScript
          </option>

          <option value="typescript">
            TypeScript
          </option>

          <option value="java">
            Java
          </option>

          <option value="c">
            C
          </option>

          <option value="cpp">
            C++
          </option>

          <option value="csharp">
            C#
          </option>

          <option value="go">
            Go
          </option>

          <option value="rust">
            Rust
          </option>

          <option value="php">
            PHP
          </option>

          <option value="ruby">
            Ruby
          </option>

          <option value="swift">
            Swift
          </option>

          <option value="kotlin">
            Kotlin
          </option>

          <option value="r">
            R
          </option>

          <option value="sql">
            SQL
          </option>

          <option value="html">
            HTML
          </option>

          <option value="css">
            CSS
          </option>

          <option value="yaml">
            YAML
          </option>

          <option value="dart">
            Dart
          </option>

        </select>

      </div>



      {/* Buttons */}

      <div className="mb-6">

        <button

          disabled={
            loadingReview ||
            loadingRewrite
          }

          className="
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-gray-600
          text-white
          px-4
          py-2
          rounded
          mr-4
          "

          onClick={
            handleReview
          }

        >

          {

            loadingReview

            ?

            "Analyzing..."

            :

            "Review Code"

          }

        </button>



        <button

          disabled={
            loadingReview ||
            loadingRewrite
          }

          className="
          bg-green-600
          hover:bg-green-700
          disabled:bg-gray-600
          text-white
          px-4
          py-2
          rounded
          "

          onClick={
            handleRewrite
          }

        >

          {

            loadingRewrite

            ?

            "Rewriting..."

            :

            "Rewrite Code"

          }

        </button>

      </div>



      {/* Main Grid */}

      <div className="grid lg:grid-cols-7 gap-6">



        {/* Left */}

        <div className="
        lg:col-span-4
        bg-slate-900
        p-4
        rounded-xl
        shadow-lg
        border
        border-slate-700
        ">

          <CodeEditor

            code={code}

            setCode={setCode}

            language={language}

          />

        </div>



        {/* Right */}

        <div className="lg:col-span-3">

          <ReviewPanel
            review={review}
          />

          {

            review &&

            (

              <div className="
                  mt-6
                  bg-slate-900
                  p-6
                  rounded-xl
                  border
                  border-slate-700
                  shadow-lg
                ">

                <h2 className="
                  text-xl
                  font-bold
                  mb-4
                ">

                  Export Report

                </h2>

                <p className="
                  text-gray-400
                  mb-5
                ">

                Download a professional PDF report containing:

                </p>

                <ul className="
                  list-disc
                  ml-6
                  text-gray-300
                  mb-5
                ">

                  <li>Summary</li>

                  <li>Issues Found</li>

                  <li>Optimized Code</li>

                </ul>

                <PdfExport
                  review={review}
                />

              </div>

            )

          }

        </div>

      </div>



      {/* Rewrite */}

      {

        rewrite && (

          <div className="
          mt-8
          bg-slate-900
          p-6
          rounded-xl
          shadow-lg
          border
          border-slate-700
          ">


            <h2 className="
            text-2xl
            font-bold
            text-green-400
            mb-6
            ">

              Rewritten Code

            </h2>



            <div className="flex justify-end mb-4">

              <button

                className="
                bg-blue-600
                hover:bg-blue-700
                px-4
                py-2
                rounded-lg
                "

                onClick={() => {

                  navigator.clipboard.writeText(

                    rewrite.optimized_code

                  );

                  toast.success(
                    "Copied to clipboard!"
                  );

                }}

              >

                Copy Code

              </button>



              <button

                className="
                bg-green-600
                hover:bg-green-700
                px-4
                py-2
                rounded-lg
                ml-3
                "

                onClick={() => {

                  const blob =
                    new Blob(
                      [
                        rewrite.optimized_code
                      ],
                      {
                        type:
                        "text/plain"
                      }
                    );

                  const url =
                    URL.createObjectURL(
                      blob
                    );

                  const a =
                    document.createElement(
                      "a"
                    );

                  a.href =
                    url;

                  a.download =
                    `optimized.${language}`;

                  a.click();

                  toast.success(
                    "Download started!"
                  );

                }}

              >

                Download

              </button>

            </div>



            <SyntaxHighlighter

              language={language}

              style={oneDark}

              showLineNumbers

              customStyle={{

                borderRadius:
                  "12px",

                maxHeight:
                  "600px"

              }}

            >

              {rewrite.optimized_code}

            </SyntaxHighlighter>



            <h2 className="
            text-xl
            font-bold
            mt-8
            mb-4
            ">

              Explanation

            </h2>



            <p className="
            bg-slate-800
            rounded-xl
            p-5
            text-gray-300
            leading-relaxed
            ">

              {rewrite.explanation}

            </p>

          </div>

        )

      }

    </div>

  );

}