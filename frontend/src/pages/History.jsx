import React, { useState, useEffect } from "react";
import { wasteService } from "../services/api";
import HistoryCard from "../components/HistoryCard";
import CategoryChip from "../components/CategoryChip";
import ResultCard from "../components/ResultCard";
import { Search, History, AlertCircle, Database, RefreshCw, Layers } from "lucide-react";

const HistoryPage = () => {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedScan, setSelectedScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Plastic", "Metal", "Glass", "Paper", "Organic", "E-Waste", "Hazardous", "Other"];

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [scans, searchTerm, selectedCategory]);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await wasteService.getHistory();
      setScans(data);
      if (data.length > 0) {
        setSelectedScan(data[0]);
      } else {
        setSelectedScan(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to history database. Ensure backend Flask is running.");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let result = [...scans];

    // 1. Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((scan) => scan.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 2. Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (scan) =>
          scan.item_name.toLowerCase().includes(term) ||
          scan.category.toLowerCase().includes(term) ||
          scan.disposal_instructions.toLowerCase().includes(term)
      );
    }

    setFilteredScans(result);

    // Keep selected scan highlighted if it exists in filtered results, or set to first item, or null
    if (result.length > 0) {
      const exists = result.find((s) => selectedScan && s.id === selectedScan.id);
      if (!exists) {
        setSelectedScan(result[0]);
      }
    } else {
      setSelectedScan(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#204732] pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display tracking-wider text-[#37D67A] text-glow uppercase">
            Database Log Registry
          </h1>
          <p className="text-xs text-[#8AA89A] font-sans leading-relaxed mt-1">
            Browse and review previous scans of classified objects to re-inspect recycling procedures and hazard notifications.
          </p>
        </div>
        
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 border border-[#204732] hover:border-[#37D67A] rounded text-xs text-[#8AA89A] hover:text-[#37D67A] transition-colors"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          REFRESH
        </button>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-[#10251C] border border-[#204732] rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Live Search */}
          <div className="md:col-span-1 relative">
            <input
              type="text"
              placeholder="Search previous scans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#07140F] border border-[#204732] focus:border-[#37D67A] focus:outline-none rounded px-3.5 py-2 text-xs text-[#E8FFF3] placeholder-[#8AA89A]/50 pr-8 font-mono"
            />
            <Search size={14} className="absolute right-2.5 top-2.5 text-[#8AA89A]" />
          </div>

          {/* Category Scroller */}
          <div className="md:col-span-2 flex items-center overflow-x-auto gap-2 pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      {loading ? (
        <div className="border border-dashed border-[#204732] rounded-lg p-16 text-center flex flex-col items-center justify-center min-h-[300px] bg-[#10251C]/20">
          <RefreshCw size={24} className="text-[#37D67A] animate-spin mb-3" />
          <p className="text-xs text-[#8AA89A] tracking-wider uppercase animate-pulse">Synchronizing local cache file...</p>
        </div>
      ) : error ? (
        <div className="border border-red-950 bg-red-950/20 rounded-lg p-8 text-center max-w-xl mx-auto w-full space-y-3">
          <AlertCircle size={28} className="text-red-500 mx-auto animate-bounce" />
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Sync Connection Fault</h3>
          <p className="text-xs text-red-300 font-sans leading-relaxed">{error}</p>
        </div>
      ) : scans.length === 0 ? (
        // Empty State: No history at all
        <div className="border border-dashed border-[#204732] rounded-lg p-16 text-center flex flex-col items-center justify-center min-h-[350px] bg-[#10251C]/10">
          <Database size={36} className="text-[#204732] mb-3" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8FFF3] mb-1">Database Empty</h3>
          <p className="text-xs text-[#8AA89A] font-sans max-w-md leading-relaxed mb-4">
            No items have been scanned yet by this operator. Navigate back to the Waste Scanner page to scan your first object.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-[#204732] hover:bg-[#37D67A] text-[#37D67A] hover:text-[#07140F] border border-[#37D67A] text-xs font-bold rounded uppercase tracking-wider"
          >
            Open Scanner Console
          </a>
        </div>
      ) : (
        // List vs Detail split screen
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left panel: Log list (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-3 max-h-[600px] overflow-y-auto pr-1.5 scrollbar-thin">
            <div className="flex justify-between items-center text-[10px] uppercase text-[#8AA89A] pb-1 border-b border-[#204732]/40 font-mono">
              <span>Matching Logs</span>
              <span>{filteredScans.length} of {scans.length}</span>
            </div>

            {filteredScans.length === 0 ? (
              <div className="border border-[#204732] bg-[#10251C]/20 rounded-lg p-8 text-center text-[#8AA89A] font-sans">
                <Layers size={20} className="mx-auto mb-2 text-[#204732]" />
                <p className="text-xs">No records found matching search filters.</p>
              </div>
            ) : (
              filteredScans.map((scan) => (
                <HistoryCard
                  key={scan.id}
                  scan={scan}
                  isSelected={selectedScan && selectedScan.id === scan.id}
                  onSelect={() => setSelectedScan(scan)}
                />
              ))
            )}
          </div>

          {/* Right panel: Inspection details (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {!selectedScan ? (
              <div className="border border-dashed border-[#204732] rounded-lg p-12 text-center text-[#8AA89A] flex flex-col items-center justify-center min-h-[350px]">
                <Layers size={28} className="text-[#204732] mb-3 animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8FFF3] mb-1">Inspector Standby</h4>
                <p className="text-[10px] font-sans">Select a log record from the database registry to analyze complete breakdown parameters.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase text-[#8AA89A] pb-1 border-b border-[#204732]/40 font-mono">
                  <span>LOG PARAMETER ANALYSIS</span>
                  <span>ID: {selectedScan.id}</span>
                </div>
                <ResultCard result={selectedScan} title={selectedScan.item_name} />
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default HistoryPage;
