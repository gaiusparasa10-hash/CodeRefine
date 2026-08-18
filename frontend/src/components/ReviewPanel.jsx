import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

export default function ReviewPanel({ review }) {
  if (!review) return null;

  const criticalIssues = review.critical || [];
  const highIssues = review.high || [];
  const mediumIssues = review.medium || [];
  const lowIssues = review.low || [];

  const chartData = [
    { name: "Critical", value: criticalIssues.length },
    { name: "High", value: highIssues.length },
    { name: "Medium", value: mediumIssues.length },
    { name: "Low", value: lowIssues.length },
  ];

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const totalIssues = criticalIssues.length + highIssues.length + mediumIssues.length + lowIssues.length;

  const renderIssueCategory = (issues, title, titleColor, cardBgBorder) => (
    <div className="mb-6">
      <h4 className={`font-bold text-base mb-3 ${titleColor}`}>
        {title} ({issues.length})
      </h4>
      {issues.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-400">
          No issues detected in this category. ✅
        </div>
      ) : (
        issues.map((issue, idx) => (
          <div key={idx} className={`border rounded-lg p-4 mb-3 text-sm ${cardBgBorder}`}>
            <div className="flex justify-between font-semibold mb-1">
              <span>Issue: {issue.issue}</span>
              {issue.line > 0 && <span className="text-xs opacity-80">Line {issue.line}</span>}
            </div>
            {issue.explanation && (
              <p className="text-slate-300 text-xs mb-2 leading-relaxed">{issue.explanation}</p>
            )}
            {issue.fix && (
              <div className="mt-2">
                <span className="text-xs font-semibold text-slate-300 block mb-1">Suggested Fix:</span>
                <SyntaxHighlighter
                  language="python"
                  style={oneDark}
                  showLineNumbers={false}
                  customStyle={{ borderRadius: "6px", fontSize: "12px", padding: "8px" }}
                >
                  {issue.fix}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md text-white">
      <h3 className="text-xl font-bold mb-4">Review Results</h3>

      {/* Severity Metrics Cards */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-red-950/80 border border-red-800/80 rounded-lg p-2 text-center">
          <span className="text-xs text-red-300 font-medium block">Critical</span>
          <span className="text-xl font-bold text-red-400">{criticalIssues.length}</span>
        </div>
        <div className="bg-orange-950/80 border border-orange-800/80 rounded-lg p-2 text-center">
          <span className="text-xs text-orange-300 font-medium block">High</span>
          <span className="text-xl font-bold text-orange-400">{highIssues.length}</span>
        </div>
        <div className="bg-yellow-950/80 border border-yellow-800/80 rounded-lg p-2 text-center">
          <span className="text-xs text-yellow-300 font-medium block">Medium</span>
          <span className="text-xl font-bold text-yellow-400">{mediumIssues.length}</span>
        </div>
        <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-lg p-2 text-center">
          <span className="text-xs text-emerald-300 font-medium block">Low</span>
          <span className="text-xl font-bold text-emerald-400">{lowIssues.length}</span>
        </div>
      </div>

      {/* Issue Distribution Chart */}
      {totalIssues > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 text-center">
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Issue Distribution</h4>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Summary Box */}
      {review.summary && (
        <div className="mb-6 bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
          <h4 className="font-bold text-sm text-slate-200 mb-1">Summary Overview</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{review.summary}</p>
        </div>
      )}

      {/* Categorized Issues */}
      {renderIssueCategory(criticalIssues, "🔴 Critical Issues", "text-red-400", "bg-red-950/40 border-red-800/60")}
      {renderIssueCategory(highIssues, "🟠 High Severity Issues", "text-orange-400", "bg-orange-950/40 border-orange-800/60")}
      {renderIssueCategory(mediumIssues, "🟡 Medium Severity Issues", "text-yellow-400", "bg-yellow-950/40 border-yellow-800/60")}
      {renderIssueCategory(lowIssues, "🟢 Low Severity Issues", "text-emerald-400", "bg-emerald-950/40 border-emerald-800/60")}

      {/* Optimized Code Box */}
      {review.optimized_code && (
        <div className="mt-6 border-t border-slate-800 pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-sm text-emerald-400">Optimized Code</h4>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(review.optimized_code);
                  toast.success("Optimized code copied!");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2.5 py-1.5 rounded"
              >
                Copy
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([review.optimized_code], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "optimized_code.txt";
                  a.click();
                  toast.success("File download started!");
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1.5 rounded"
              >
                Download
              </button>
            </div>
          </div>
          <SyntaxHighlighter
            language="python"
            style={oneDark}
            showLineNumbers
            customStyle={{ borderRadius: "8px", fontSize: "12px", maxHeight: "300px" }}
          >
            {review.optimized_code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}