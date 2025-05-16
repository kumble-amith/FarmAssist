import { useState } from "react";
import { addCropListing } from "../../database/store";
import { auth } from "../../database/firebase.config";

const AddListing = () => {
  const [formData, setFormData] = useState({
    farmer_name: "",
    crop_name: "",
    quantity: 0,
    price_per_kg: 0,
    location: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to add a listing.");
      return;
    }

    await addCropListing(
      user.uid,
      formData.farmer_name,
      formData.crop_name,
      formData.quantity,
      formData.price_per_kg,
      formData.location,
      formData.contact
    );
    alert("Listing added successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4 sm:px-8">
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10 drop-shadow-sm">
        🌿 Add New Crop Listing
      </h1>

      <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Farmer Name</label>
            <input
              type="text"
              name="farmer_name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Crop Name</label>
            <input
              type="text"
              name="crop_name"
              placeholder="Enter crop name"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Quantity (kg)</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Price per kg (₹)</label>
              <input
                type="number"
                name="price_per_kg"
                placeholder="Enter price"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter contact number"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow"
          >
            ➕ Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
