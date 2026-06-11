import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { oneDark }
from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip
}
from "recharts";

export default function ReviewPanel({
  review
}) {

  if (!review) return null;


  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e"
  ];


  const chartData = [

    {
      name: "Critical",
      value: review.critical.length
    },

    {
      name: "High",
      value: review.high.length
    },

    {
      name: "Medium",
      value: review.medium.length
    },

    {
      name: "Low",
      value: review.low.length
    }

  ];


  const renderIssues = (
    issues,
    title,
    titleColor,
    cardColor
  ) => {

    return (

      <div className="mb-8">

        <h3 className={`font-bold text-xl mb-3 ${titleColor}`}>
          {title}
        </h3>

        {

          issues.length === 0

            ?

            (

              <div className="
              bg-slate-900
              border
              border-slate-700
              rounded-xl
              p-5
              shadow-lg
              ">

                <p className="text-gray-300">

                  No Issues Found ✅

                </p>

              </div>

            )

            :

            (

              issues.map(

                (
                  issue,
                  index
                ) => (

                  <div
                    key={index}
                    className={`border rounded-xl p-5 mb-4 ${cardColor}`}
                  >

                    <div className="mb-2">

                      <span className="font-bold">

                        Line:

                      </span>

                      {" "}

                      {issue.line}

                    </div>


                    <div className="mb-2">

                      <span className="font-bold">

                        Issue:

                      </span>

                      {" "}

                      {issue.issue}

                    </div>


                    <div className="mb-2">

                      <span className="font-bold">

                        Explanation:

                      </span>

                      <p className="text-gray-200 mt-1">

                        {issue.explanation}

                      </p>

                    </div>


                    <div>

                      <span className="font-bold">

                        Suggested Fix

                      </span>

                      <SyntaxHighlighter
                        language="python"
                        style={oneDark}
                        showLineNumbers
                        customStyle={{
                          borderRadius: "10px"
                        }}
                      >

                        {issue.fix}

                      </SyntaxHighlighter>

                    </div>

                  </div>

                )

              )

            )

        }

      </div>

    );

  };


  return (

    <div className="
    bg-slate-800
    p-6
    rounded-xl
    shadow-lg
    text-white
    ">

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-3 mb-8">

        <div className="bg-red-600 rounded-lg p-4 text-center">

          <p>

            Critical

          </p>

          <h1 className="text-3xl font-bold">

            {review.critical.length}

          </h1>

        </div>


        <div className="bg-orange-500 rounded-lg p-4 text-center">

          <p>

            High

          </p>

          <h1 className="text-3xl font-bold">

            {review.high.length}

          </h1>

        </div>


        <div className="bg-yellow-500 rounded-lg p-4 text-center">

          <p>

            Medium

          </p>

          <h1 className="text-3xl font-bold">

            {review.medium.length}

          </h1>

        </div>


        <div className="bg-green-600 rounded-lg p-4 text-center">

          <p>

            Low

          </p>

          <h1 className="text-3xl font-bold">

            {review.low.length}

          </h1>

        </div>

      </div>


      {/* Pie Chart */}

      <div className="
      bg-slate-900
      rounded-xl
      p-6
      mb-8
      flex
      flex-col
      items-center
      ">

        <h2 className="
        text-2xl
        font-bold
        mb-6
        ">

          Issue Distribution

        </h2>

        <PieChart
          width={350}
          height={300}
        >

          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >

            {

              chartData.map(

                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />

                )

              )

            }

          </Pie>

          <Tooltip />

        </PieChart>

      </div>


      {/* Heading */}

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-3xl font-bold">

          Review Results

        </h2>


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
              review.optimized_code
            );

          }}
        >

          📋 Copy Code

        </button>

      </div>



      {renderIssues(
        review.critical,
        "🔴 Critical Issues",
        "text-red-400",
        "bg-red-950 border-red-700"
      )}


      {renderIssues(
        review.high,
        "🟠 High Issues",
        "text-orange-400",
        "bg-orange-950 border-orange-700"
      )}


      {renderIssues(
        review.medium,
        "🟡 Medium Issues",
        "text-yellow-400",
        "bg-yellow-950 border-yellow-700"
      )}


      {renderIssues(
        review.low,
        "🟢 Low Issues",
        "text-green-400",
        "bg-green-950 border-green-700"
      )}


      {/* Summary */}

      <div className="mt-8">

        <h3 className="font-bold text-2xl mb-3">

          Summary

        </h3>

        <div className="
        bg-slate-700
        rounded-xl
        p-4
        ">

          <p className="text-gray-300 leading-relaxed">

            {review.summary}

          </p>

        </div>

      </div>



      {/* Optimized Code */}

      <div className="mt-8">

        <div className="flex justify-between items-center mb-3">

          <h3 className="font-bold text-2xl">

            Optimized Code

          </h3>


          <button
            className="
            bg-green-600
            hover:bg-green-700
            px-4
            py-2
            rounded-lg
            "
            onClick={() => {

              const blob =
                new Blob(
                  [
                    review.optimized_code
                  ],
                  {
                    type: "text/plain"
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

              a.href = url;

              a.download =
                "optimized_code.txt";

              a.click();

            }}
          >

            ⬇ Download

          </button>

        </div>


        <SyntaxHighlighter
          language="python"
          style={oneDark}
          showLineNumbers
          customStyle={{
            borderRadius: "12px",
            maxHeight: "500px"
          }}
        >

          {review.optimized_code}

        </SyntaxHighlighter>

      </div>

    </div>

  );

}