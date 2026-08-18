import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await api.get("/history/");
      const sortedHistory = (response.data || []).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setHistory(sortedHistory);
    } catch (error) {
      console.error("Failed to fetch history:", error);
      toast.error("Could not load review history from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Review History</h2>
            <p className="text-sm text-slate-400 mt-1">
              View your previously analyzed code reviews saved in PostgreSQL.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-xl text-center text-slate-400">
            ⏳ Loading review history...
          </div>
        ) : history.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-xl text-center text-slate-400">
            <span className="text-4xl block mb-3">📜</span>
            <p className="text-base text-slate-300 font-medium mb-1">No Review History Found</p>
            <p className="text-sm text-slate-400">
              Run your first code review on the dashboard to save results here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md hover:border-slate-700 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 font-semibold px-3 py-1 rounded-md text-xs uppercase tracking-wider">
                      {item.language}
                    </span>
                    <span className="text-xs text-slate-400">
                      📅 {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    Review #{item.id}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Source Code */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Source Code
                      </h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.source_code || "");
                          toast.success("Source code copied!");
                        }}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded transition"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-emerald-400 font-mono border border-slate-800 max-h-52 whitespace-pre-wrap">
                      {item.source_code || "// Empty"}
                    </pre>
                  </div>

                  {/* Optimized Code */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Optimized Code
                      </h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.optimized_code || "");
                          toast.success("Optimized code copied!");
                        }}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded transition"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-emerald-400 font-mono border border-slate-800 max-h-52 whitespace-pre-wrap">
                      {item.optimized_code || "// No optimized code"}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}