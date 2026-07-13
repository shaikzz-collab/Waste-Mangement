import React, { useState, useEffect } from "react";
import { dashboardService } from "../services/api";
import StatCard from "../components/StatCard";
import DashboardCharts from "../components/DashboardCharts";
import { BarChart3, Recycle, AlertOctagon, HelpCircle, Layers, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Unable to synchronize with dashboard database. Verify local Flask server.");
    } finally {
      setLoading(false);
    }
  };

  const getHazardDescription = (count) => {
    if (count === 0) return "Zero toxicity logs recorded.";
    if (count === 1) return "Warning: 1 hazard item registered.";
    return `Alert: ${count} toxic items in database.`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono space-y-8">
      {/* Dashboard Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#204732] pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display tracking-wider text-[#37D67A] text-glow uppercase">
            OPERATIONAL METRICS CONSOLE
          </h1>
          <p className="text-xs text-[#8AA89A] font-sans leading-relaxed mt-1">
            Real-time tracking of waste classifications, recovery efficiency margins, material distribution, and environmental impacts.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 border border-[#204732] hover:border-[#37D67A] rounded text-xs text-[#8AA89A] hover:text-[#37D67A] transition-colors"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          SYNC DATA
        </button>
      </div>

      {error ? (
        <div className="border border-red-950 bg-red-950/20 rounded-lg p-8 text-center max-w-xl mx-auto w-full space-y-3">
          <AlertOctagon size={28} className="text-red-500 mx-auto animate-bounce" />
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Sync Connection Fault</h3>
          <p className="text-xs text-red-300 font-sans leading-relaxed">{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Demo Data Notice banner if user scans are empty */}
          {stats && stats.total_scans === 0 && (
            <div className="border border-amber-600 bg-amber-950/20 text-amber-300 rounded p-4 text-xs font-sans leading-relaxed flex items-center gap-3">
              <span className="text-lg">💡</span>
              <div>
                <span className="font-bold uppercase font-mono block mb-0.5 text-amber-400">Registry Standby</span>
                You haven't scanned any waste items yet. The graphs below are initialized with high-fidelity placeholder metrics to showcase system capabilities. Start scanning items on the main console to record active operational logs.
              </div>
            </div>
          )}

          {/* 4 Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Logs Processed"
              value={loading ? "..." : stats?.total_scans}
              icon={<Layers size={16} />}
              description="Sum of all text & visual queries"
              loading={loading}
            />

            <StatCard
              title="Recovery Efficiency"
              value={loading ? "..." : `${stats?.recycling_rate}%`}
              icon={<Recycle size={16} />}
              description="Scans marked as Recyclable"
              loading={loading}
            />

            <StatCard
              title="Reusability Rate"
              value={loading ? "..." : stats?.reusable_count}
              icon={<HelpCircle size={16} />}
              description="Objects eligible for upcycling"
              loading={loading}
            />

            <StatCard
              title="Toxic Materials"
              value={loading ? "..." : stats?.hazardous_count}
              icon={<AlertOctagon size={16} className={stats?.hazardous_count > 0 ? "text-red-500 animate-pulse" : ""} />}
              description={loading ? "..." : getHazardDescription(stats?.hazardous_count)}
              loading={loading}
            />
          </div>

          {/* ChartJS Visuals Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#8AA89A]">
              ▋ Graph Analytics
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-[#10251C] border border-[#204732] rounded-lg p-5 h-72 animate-pulse flex flex-col justify-between">
                    <div className="h-4 bg-[#07140F] rounded w-1/3"></div>
                    <div className="h-40 bg-[#07140F] rounded w-full"></div>
                    <div className="h-4 bg-[#07140F] rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <DashboardCharts data={stats} />
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default Dashboard;
