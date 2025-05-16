import { db } from "../database/firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc, // ✅ Added delete function
} from "firebase/firestore";

export interface CropListing {
  id: string;
  farmer_name: string;
  crop_name: string;
  quantity: number;
  price_per_kg: number;
  location: string;
  contact: string;
}

export const addUser = async (name: string, email: string, uid: string) => {
  try {
    if (await getUser("email", email)) return;
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, uid);
    await setDoc(userDocRef, { name, email, uid });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (name: string, value: string) => {
  try {
    const userSnapshot = await getDocs(
      query(collection(db, "users"), where(name, "==", value))
    );
    return userSnapshot.empty ? null : userSnapshot.docs[0].data();
  } catch (error) {
    return null;
  }
};

export const updateUser = async (
  uid: string,
  newData: { name?: string; email?: string }
) => {
  console.log(newData);
  try {
    const userDocRef = doc(collection(db, "users"), uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.log("User document does not exist");
      return;
    }

    await updateDoc(userDocRef, newData);
    console.log("User document updated successfully!");
  } catch (error) {
    console.error("Error updating user document: ", error);
  }
};

// ✅ Add Crop Listing
export const addCropListing = async (
  uid: string,
  farmer_name: string,
  crop_name: string,
  quantity: number,
  price_per_kg: number,
  location: string,
  contact: string
) => {
  try {
    const listingsRef = collection(db, "apmc_listings");
    await addDoc(listingsRef, {
      uid,
      farmer_name,
      crop_name,
      quantity,
      price_per_kg,
      location,
      contact,
      createdAt: new Date(),
    });
    console.log("Crop listing added successfully!");
  } catch (error) {
    console.error("Error adding crop listing: ", error);
  }
};

// ✅ Get User's Crop Listings
export const getUserCropListings = async (uid: string): Promise<CropListing[]> => {
  try {
    const q = query(collection(db, "apmc_listings"), where("uid", "==", uid));
    const listingsSnapshot = await getDocs(q);

    return listingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CropListing[];
  } catch (error) {
    console.error("Error fetching user crop listings:", error);
    return [];
  }
};

// ✅ Get All Crop Listings
export const getAllCropListings = async (): Promise<CropListing[]> => {
  try {
    const listingsSnapshot = await getDocs(collection(db, "apmc_listings"));
    
    return listingsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        farmer_name: data.farmer_name || "",
        crop_name: data.crop_name || "",
        quantity: data.quantity || 0,
        price_per_kg: data.price_per_kg || 0,
        location: data.location || "",
        contact: data.contact || "",
      };
    });
  } catch (error) {
    console.error("Error fetching all crop listings:", error);
    return [];
  }
};

// ✅ Update Crop Listing
export const updateCropListing = async (listingId: string, newData: Partial<CropListing>) => {
  try {
    const listingRef = doc(db, "apmc_listings", listingId);
    await updateDoc(listingRef, newData);
    console.log("Crop listing updated successfully!");
  } catch (error) {
    console.error("Error updating crop listing: ", error);
  }
};

// ✅ Delete Crop Listing
export const deleteCropListing = async (listingId: string) => {
  try {
    const listingRef = doc(db, "apmc_listings", listingId);
    await deleteDoc(listingRef);
    console.log("Crop listing deleted successfully!");
  } catch (error) {
    console.error("Error deleting crop listing: ", error);
  }
};
