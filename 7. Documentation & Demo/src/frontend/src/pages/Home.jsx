import React, { useState, useRef } from "react";
import { wasteService } from "../services/api";
import QuickSelectGrid from "../components/QuickSelectGrid";
import LoadingAnimation from "../components/LoadingAnimation";
import ResultCard from "../components/ResultCard";
import { Search, Camera, Sparkles, Upload, AlertCircle, RefreshCw } from "lucide-react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Image scan state
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleScanText = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    triggerScan(async () => {
      return await wasteService.scanText(query.trim());
    });
  };

  const handleQuickSelect = (itemName) => {
    setQuery(itemName);
    triggerScan(async () => {
      return await wasteService.scanText(itemName);
    });
  };

  const triggerScan = async (scanFn) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Small artificial delay to let our retro terminal loading animation show off
      const [res] = await Promise.all([
        scanFn(),
        new Promise((resolve) => setTimeout(resolve, 2000))
      ]);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Connection failed. Please boot local Flask server.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setQuery(file.name);
    triggerScan(async () => {
      return await wasteService.scanImage(file);
    });
  };

  const resetScanner = () => {
    setQuery("");
    setResult(null);
    setError(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Welcome Banner */}
      <div className="text-center space-y-2 pb-6 border-b border-[#204732]">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-wider text-[#37D67A] text-glow uppercase">
          Waste Analysis Terminal
        </h1>
        <p className="text-xs sm:text-sm text-[#8AA89A] max-w-2xl mx-auto font-sans leading-relaxed">
          Input an object name or submit a camera capture to query the Groq LLM agent for composition details, recycling parameters, and nearby disposal hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Controls & Input */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#10251C] border border-[#204732] rounded-lg p-5 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#8AA89A] border-b border-[#204732] pb-2 font-bold">
              ▋ INPUT SELECTION
            </h3>

            {/* Form */}
            <form onSubmit={handleScanText} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter waste item (e.g. plastic bottle)"
                  disabled={loading}
                  className="w-full bg-[#07140F] border border-[#204732] focus:border-[#37D67A] focus:outline-none rounded px-3.5 py-2.5 text-xs text-[#E8FFF3] placeholder-[#8AA89A]/50 pr-10 transition-colors font-mono"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="absolute right-2.5 top-2.5 text-[#8AA89A] hover:text-[#37D67A] transition-colors disabled:opacity-30 disabled:hover:text-[#8AA89A]"
                >
                  <Search size={16} />
                </button>
              </div>

              {/* Submit & Scan Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="flex-1 bg-[#204732] hover:bg-[#37D67A] hover:text-[#07140F] text-[#37D67A] border border-[#37D67A] py-2.5 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-all duration-200 disabled:opacity-40 disabled:hover:bg-[#204732] disabled:hover:text-[#37D67A]"
                >
                  <Sparkles size={14} />
                  ANALYZE
                </button>

                <button
                  type="button"
                  onClick={handleImageClick}
                  disabled={loading}
                  className="bg-[#07140F] hover:bg-[#204732] border border-[#204732] text-[#37D67A] px-3.5 rounded flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
                  title="Upload Image/Camera capture"
                >
                  <Camera size={16} />
                  <span className="text-xs font-bold hidden sm:inline">SCAN</span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </form>

            {/* Image Preview Box */}
            {imagePreview && (
              <div className="border border-[#204732] bg-[#07140F] rounded p-2 text-center relative overflow-hidden">
                <p className="text-[10px] text-[#8AA89A] uppercase tracking-wider mb-2 font-bold">Image Capture Stream</p>
                <img
                  src={imagePreview}
                  alt="Waste source preview"
                  className="max-h-40 mx-auto rounded border border-[#204732] object-contain bg-[#10251C]"
                />
                <button
                  onClick={resetScanner}
                  className="mt-2 text-[10px] text-red-400 hover:underline uppercase block mx-auto"
                >
                  Clear Image
                </button>
              </div>
            )}
          </div>

          {/* Quick select grid */}
          <div className="bg-[#10251C] border border-[#204732] rounded-lg p-5">
            <QuickSelectGrid onSelect={handleQuickSelect} disabled={loading} />
          </div>
        </div>

        {/* Right Column: Output / Result Terminal */}
        <div className="lg:col-span-2 flex flex-col justify-start">
          
          {/* Idle State */}
          {!loading && !result && !error && (
            <div className="border border-dashed border-[#204732] rounded-lg p-12 text-center flex flex-col items-center justify-center min-h-[300px] bg-[#10251C]/20">
              <div className="w-12 h-12 rounded-full border border-[#204732] flex items-center justify-center text-[#37D67A] mb-4 text-glow animate-pulse">
                ♻
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8FFF3] mb-1.5">Awaiting Input Stream</h3>
              <p className="text-xs text-[#8AA89A] max-w-md font-sans leading-relaxed">
                Type an item name, click one of the quick select presets, or upload a simulated photograph to begin the classification scan.
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center min-h-[300px] w-full">
              <LoadingAnimation />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="border border-red-900 bg-red-950/20 rounded-lg p-6 text-center max-w-xl mx-auto w-full space-y-4">
              <div className="flex justify-center text-red-500">
                <AlertCircle size={32} className="animate-bounce" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400">Scanner Failure Event</h3>
              <p className="text-xs text-red-300 font-sans leading-relaxed">
                {error}
              </p>
              <div className="pt-2">
                <button
                  onClick={resetScanner}
                  className="px-3.5 py-1.5 bg-[#204732]/30 border border-[#204732] hover:border-red-500 hover:text-red-400 text-xs font-bold rounded transition-colors uppercase"
                >
                  Reset Terminal
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {!loading && result && (
            <div className="space-y-4">
              <ResultCard result={result} title={result.item_name || query} />
              
              <div className="flex justify-center">
                <button
                  onClick={resetScanner}
                  className="flex items-center gap-1.5 px-4 py-2 border border-[#204732] hover:border-[#37D67A] hover:bg-[#204732]/20 text-xs font-bold rounded text-[#8AA89A] hover:text-[#37D67A] transition-all duration-200"
                >
                  <RefreshCw size={12} />
                  RESET AND NEW SCAN
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Home;
