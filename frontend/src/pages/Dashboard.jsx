import React, { useState } from "react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import api from "../services/api";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import PdfExport from "../components/PdfExport";

const SUPPORTED_LANGUAGES = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "R", value: "r" },
  { label: "SQL", value: "sql" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "YAML", value: "yaml" },
  { label: "Dart", value: "dart" },
];

export default function Dashboard() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [review, setReview] = useState(null);
  const [rewrite, setRewrite] = useState(null);
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingRewrite, setLoadingRewrite] = useState(false);

  const validateCodeInput = () => {
    if (!code || !code.trim()) {
      toast.error("Please enter some code before reviewing.");
      return false;
    }
    return true;
  };

  const handleReview = async () => {
    if (!validateCodeInput()) return;

    setLoadingReview(true);
    setReview(null);
    setRewrite(null);

    try {
      const response = await api.post("/review/", {
        language,
        code: code.trim(),
      });

      setReview(response.data);
      toast.success("Code analysis completed successfully!");
    } catch (error) {
      console.error("Review request error:", error);
      if (!error.response) {
        toast.error("Could not connect to the server. Please check that the backend is running.");
      } else if (error.response.status >= 500) {
        const detail = String(error.response.data?.detail || "");
        if (detail.toLowerCase().includes("groq") || detail.toLowerCase().includes("model") || detail.toLowerCase().includes("404")) {
          toast.error("AI service is temporarily unavailable. Please try again.");
        } else {
          toast.error("AI review failed. Please try again.");
        }
      } else {
        toast.error(error.response.data?.detail || "AI review failed. Please try again.");
      }
    } finally {
      setLoadingReview(false);
    }
  };

  const handleRewrite = async () => {
    if (!validateCodeInput()) return;

    setLoadingRewrite(true);
    setRewrite(null);
    setReview(null);

    try {
      const response = await api.post("/rewrite/", {
        language,
        code: code.trim(),
      });

      setRewrite(response.data);
      toast.success("Code rewritten successfully!");
    } catch (error) {
      console.error("Rewrite request error:", error);
      if (!error.response) {
        toast.error("Could not connect to the server. Please check that the backend is running.");
      } else if (error.response.status >= 500) {
        const detail = String(error.response.data?.detail || "");
        if (detail.toLowerCase().includes("groq") || detail.toLowerCase().includes("model") || detail.toLowerCase().includes("404")) {
          toast.error("AI service is temporarily unavailable. Please try again.");
        } else {
          toast.error("AI rewrite failed. Please try again.");
        }
      } else {
        toast.error(error.response.data?.detail || "AI rewrite failed. Please try again.");
      }
    } finally {
      setLoadingRewrite(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        {/* Page Header */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">AI Code Review</h2>
          <p className="text-slate-400 text-base max-w-3xl">
            Paste your code below and get AI-powered suggestions for bugs, security vulnerabilities, code quality, and possible optimizations.
          </p>
        </section>

        {/* Action Bar: Language Selector & Review Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <label htmlFor="language-select" className="text-sm font-semibold text-slate-300">
              Language:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReview}
              disabled={loadingReview || loadingRewrite}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium px-5 py-2 rounded-lg text-sm transition shadow-md"
            >
              {loadingReview ? "Reviewing code..." : "⚡ Review Code"}
            </button>

            <button
              onClick={handleRewrite}
              disabled={loadingReview || loadingRewrite}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium px-5 py-2 rounded-lg text-sm transition shadow-md"
            >
              {loadingRewrite ? "Rewriting code..." : "✨ Rewrite Code"}
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-7 gap-6">
          {/* Left Column: Code Editor */}
          <div className="lg:col-span-4 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Source Code ({language})
              </span>
              {code && (
                <button
                  onClick={() => setCode("")}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear Code
                </button>
              )}
            </div>
            <CodeEditor code={code} setCode={setCode} language={language} />
          </div>

          {/* Right Column: Review Results & PDF Export */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {!review && !rewrite && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
                <span className="text-4xl mb-3">🔍</span>
                <h3 className="text-lg font-semibold text-slate-200 mb-1">Ready for Code Review</h3>
                <p className="text-sm text-slate-400 max-w-xs">
                  Paste your code on the left, choose your language, and click "Review Code" to analyze issues.
                </p>
              </div>
            )}

            {review && (
              <>
                <ReviewPanel review={review} />
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold text-white mb-2">📄 Export Review PDF</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Download a comprehensive review report containing issue severity statistics, summary, and suggested fixes.
                  </p>
                  <PdfExport review={review} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* AI Rewrite Output Section */}
        {rewrite && (
          <div className="mt-8 bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-emerald-400">Rewritten & Optimized Code</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(rewrite.optimized_code);
                    toast.success("Code copied to clipboard!");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg font-medium transition"
                >
                  📋 Copy Code
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([rewrite.optimized_code], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `optimized.${language}`;
                    a.click();
                    toast.success("File download started!");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-2 rounded-lg font-medium transition"
                >
                  ⬇ Download
                </button>
              </div>
            </div>

            <SyntaxHighlighter
              language={language}
              style={oneDark}
              showLineNumbers
              customStyle={{ borderRadius: "10px", maxHeight: "500px" }}
            >
              {rewrite.optimized_code || "// No optimized code generated."}
            </SyntaxHighlighter>

            {rewrite.explanation && (
              <div className="mt-6">
                <h4 className="text-lg font-bold text-white mb-2">Explanation of Changes</h4>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {rewrite.explanation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}