import { useEffect, useState } from "react";
import { getAllCropListings } from "../../database/store";
import { CropListing } from "../../database/store";
import { MapPin, Weight, IndianRupee } from "lucide-react"; // Optional: Icon lib like lucide-react

const APMC = () => {
  const [listings, setListings] = useState<CropListing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const data = await getAllCropListings();
      setListings(data);
    };
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4 sm:px-8">
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10 drop-shadow-sm">
        🌾 APMC Market Crop Listings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 relative"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-1">
              {listing.crop_name}
            </h2>
            <p className="text-gray-500 text-sm mb-4">👨‍🌾 {listing.farmer_name}</p>

            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>
                  <strong>Location:</strong> {listing.location}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-green-600" />
                <span>
                  <strong>Quantity:</strong> {listing.quantity} kg
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-green-600" />
                <span>
                  <strong>Price:</strong> ₹{listing.price_per_kg}/kg
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APMC;
