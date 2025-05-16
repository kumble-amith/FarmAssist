import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Components
import Header from "./components/Header.tsx";

// Pages
import Home from "./pages/Home/Home.tsx";
import Register from "./pages/Auth/Register.tsx";
import Login from "./pages/Auth/Login.tsx";
import Weather from "./pages/WeatherReport/Weather.tsx";
import CropAdviser from "./pages/CropAdviser/CropAdviser.tsx";
import Disease from "./pages/DiseaseDetector/Disease.tsx";
import ErrorPage from "./pages/ErrorHandler/ErrorPage.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import CropYield from "./pages/Yield/CropYield.tsx";

// APMC Pages
import APMC from "./pages/APMC/APMC.tsx";
import AddListing from "./pages/APMC/AddListing.tsx";
import Dashboard from "./pages/APMC/Dashboard.tsx"; // User-specific listings

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "weather.report", element: <Weather /> },
      { path: "crop.adviser.ai", element: <CropAdviser /> },
      { path: "crop.disease.ai", element: <Disease /> },
      { path: "profile", element: <Profile /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "crop.cropYield.ai", element: <CropYield /> },
      
      // APMC Routes
      { path: "apmc", element: <APMC /> },
      { path: "add-listing", element: <AddListing /> },
      { path: "dashboard", element: <Dashboard /> }, // User's Listings
    ],
  },
]);

const App = () => (
  <div className="app">
    <RouterProvider router={router} />
  </div>
);

export default App;
