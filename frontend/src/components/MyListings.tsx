import { useEffect, useState } from "react";
import { getUserCropListings, deleteCropListing } from "../database/store";
import { useAuth } from "./contexts/Auth";

interface CropListing {
  id: string;
  farmer_name: string;
  crop_name: string;
  quantity: number;
  price_per_kg: number;
  location: string;
  contact: string;
}

const MyListings = () => {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState<CropListing[]>([]);

  useEffect(() => {
    if (currentUser?.uid) {
      getUserCropListings(currentUser.uid).then((data) => setListings(data));
    }
  }, [currentUser]);

  const handleRemove = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    await deleteCropListing(id);
    setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4 sm:px-8">
      <h1 className="text-4xl font-extrabold text-green-800 text-center mb-10 drop-shadow-sm">
        🌾 My Crop Listings
      </h1>

      <div className="max-w-4xl mx-auto">
        {listings.length > 0 ? (
          <ul className="grid gap-6">
            {listings.map((listing) => (
              <li
                key={listing.id}
                className="bg-white border border-gray-200 p-6 shadow-lg rounded-xl transition hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold text-green-700">{listing.crop_name}</h2>
                    <p className="text-gray-600">
                      Quantity: <span className="font-medium">{listing.quantity} kg</span>
                    </p>
                    <p className="text-gray-600">
                      Price: <span className="font-medium">₹{listing.price_per_kg}/kg</span>
                    </p>
                    <p className="text-gray-600">
                      Location: <span className="font-medium">{listing.location}</span>
                    </p>
                    <p className="text-gray-600">
                      Contact: <span className="font-medium">{listing.contact}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(listing.id)}
                    className="self-start sm:self-center bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-300"
                  >
                    ❌ Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-600 text-lg font-medium mt-10">
            No listings found. 🌱
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
