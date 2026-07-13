import React, { useState, useEffect } from "react";
import { centerService } from "../services/api";
import CategoryChip from "../components/CategoryChip";
import CenterCard from "../components/CenterCard";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Building2, Navigation, Compass, AlertCircle, Phone, Clock, ArrowRight, ShieldCheck } from "lucide-react";

// Fix Leaflet marker icons by using clean custom Leaflet icons
const greenMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper component to programmatically pan/zoom the Leaflet map
const ChangeMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 14, { animate: true, duration: 1 });
    }
  }, [center, map]);
  return null;
};

const MapPage = () => {
  const [centers, setCenters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default coordinate center (San Francisco)
  const mapDefaultCenter = [37.7749, -122.4194];

  const categories = ["All", "Plastic", "Metal", "Glass", "Paper", "Organic", "E-Waste", "Hazardous"];

  useEffect(() => {
    fetchCenters();
  }, [selectedCategory]);

  const fetchCenters = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await centerService.getCenters(selectedCategory);
      setCenters(data);
      // Auto-select first center if available
      if (data.length > 0) {
        setSelectedCenter(data[0]);
      } else {
        setSelectedCenter(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve collection center list. Boot backend Server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#204732] pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display tracking-wider text-[#37D67A] text-glow uppercase">
            Collection Registry Map
          </h1>
          <p className="text-xs text-[#8AA89A] font-sans leading-relaxed mt-1">
            Locate verified recycling facilities, hazard collection hubs, and compost drop-offs around your geographical vicinity.
          </p>
        </div>
      </div>

      {/* Main 5-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* COLUMN 1: Category Filters (1/5 column) */}
        <div className="lg:col-span-1 bg-[#10251C] border border-[#204732] rounded-lg p-4 space-y-3">
          <h3 className="text-xs uppercase font-mono tracking-widest text-[#8AA89A] border-b border-[#204732] pb-1.5 font-bold">
            ▋ Filter Materials
          </h3>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-thin">
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

        {/* COLUMN 2 & 3: Map Container (2/5 column) */}
        <div className="lg:col-span-2 bg-[#10251C] border border-[#204732] rounded-lg p-2 h-[350px] lg:h-[550px] flex flex-col relative overflow-hidden">
          {/* Map Overlay Loader */}
          {loading && (
            <div className="absolute inset-0 bg-[#07140F]/80 z-20 flex flex-col items-center justify-center space-y-3">
              <span className="animate-spin text-[#37D67A]">♻</span>
              <span className="text-[10px] text-[#8AA89A] tracking-widest animate-pulse">UPDATING MAP LAYOUTS...</span>
            </div>
          )}

          {/* Leaflet Map */}
          <MapContainer
            center={selectedCenter ? selectedCenter.coordinates : mapDefaultCenter}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full rounded border border-[#204732]/60"
          >
            {/* CartoDB Dark Matter Map Tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            {/* Render center markers */}
            {centers.map((center) => {
              const isCenterSelected = selectedCenter && selectedCenter.id === center.id;
              return (
                <Marker
                  key={center.id}
                  position={center.coordinates}
                  icon={isCenterSelected ? redMarkerIcon : greenMarkerIcon}
                  eventHandlers={{
                    click: () => handleCenterSelect(center)
                  }}
                >
                  <Popup>
                    <div className="font-mono text-xs space-y-1">
                      <p className="font-bold text-[#37D67A]">{center.name}</p>
                      <p className="text-[10px] text-[#8AA89A]">{center.address}</p>
                      <p className="text-[9px] text-amber-400 font-bold uppercase">{center.category} Hub</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Change Map panning when selected center changes */}
            {selectedCenter && (
              <ChangeMapView center={selectedCenter.coordinates} />
            )}
          </MapContainer>
        </div>

        {/* COLUMN 4: Center List (1/5 column) */}
        <div className="lg:col-span-1 flex flex-col bg-[#10251C] border border-[#204732] rounded-lg p-4 space-y-3 h-[400px] lg:h-[550px] overflow-hidden">
          <h3 className="text-xs uppercase font-mono tracking-widest text-[#8AA89A] border-b border-[#204732] pb-1.5 font-bold flex justify-between items-center">
            <span>▋ Hub Listings</span>
            <span className="text-[10px] text-[#37D67A] bg-[#204732]/30 px-1.5 rounded">{centers.length}</span>
          </h3>

          {error ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4 text-red-400">
              <AlertCircle size={24} className="mb-2" />
              <p className="text-[10px]">{error}</p>
            </div>
          ) : centers.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center text-[#8AA89A] p-4 font-sans">
              <Building2 size={24} className="mb-2 text-[#204732]" />
              <p className="text-[10px]">No collection hubs found matching this filter.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {centers.map((center) => (
                <CenterCard
                  key={center.id}
                  center={center}
                  isSelected={selectedCenter && selectedCenter.id === center.id}
                  onSelect={() => handleCenterSelect(center)}
                />
              ))}
            </div>
          )}
        </div>

        {/* COLUMN 5: Detail Panel (1/5 column) */}
        <div className="lg:col-span-1 bg-[#10251C] border border-[#204732] rounded-lg p-4 flex flex-col h-[300px] lg:h-[550px] overflow-hidden">
          <h3 className="text-xs uppercase font-mono tracking-widest text-[#8AA89A] border-b border-[#204732] pb-1.5 font-bold">
            ▋ Facility Parameters
          </h3>

          {!selectedCenter ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center text-[#8AA89A] font-sans p-4">
              <Compass size={32} className="mb-2 text-[#204732] animate-spin-slow" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8FFF3] mb-1">Awaiting Lock-on</h4>
              <p className="text-[10px] leading-relaxed">Select a coordinate marker or listing card to inspect operational guidelines.</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between h-full pt-2">
              <div className="space-y-4 overflow-y-auto pr-1 scrollbar-thin">
                <div>
                  <h4 className="text-[#37D67A] font-bold text-sm tracking-wide leading-snug">{selectedCenter.name}</h4>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#07140F] border border-[#204732] text-[9px] uppercase tracking-wider text-[#37D67A] font-bold">
                    {selectedCenter.category} Station
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-[#8AA89A] font-sans">
                  <div className="flex items-start gap-2">
                    <Building2 size={13} className="text-[#37D67A] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#8AA89A] font-mono font-bold uppercase">PHYSICAL ADDRESS</p>
                      <p className="leading-relaxed mt-0.5">{selectedCenter.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone size={13} className="text-[#37D67A] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#8AA89A] font-mono font-bold uppercase">OPERATING PHONE</p>
                      <p className="mt-0.5">{selectedCenter.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock size={13} className="text-[#37D67A] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#8AA89A] font-mono font-bold uppercase">HOURS OF OPERATION</p>
                      <p className="mt-0.5 text-[11px] font-mono">{selectedCenter.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#204732]/60 pt-3">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-[#8AA89A] mb-2 font-bold">Materials Accepted:</p>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {selectedCenter.accepted_items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px] text-[#E8FFF3] font-sans">
                        <span className="w-1 h-1 rounded-full bg-[#37D67A]"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#204732]/60 mt-auto">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedCenter.name + " " + selectedCenter.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-[#204732] hover:bg-[#37D67A] text-[#37D67A] hover:text-[#07140F] border border-[#37D67A] rounded text-[10px] font-bold text-center block uppercase tracking-wider transition-colors"
                >
                  ROUTE NAVIGATION VIA GPS
                </a>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default MapPage;
