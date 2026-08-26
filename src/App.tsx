import "./App.css";
import Home from "@/components/pages/home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Destinations from "./components/pages/destinations";
import Layout from "./components/layout/layout";
import DestinationDetail from "./components/pages/destinations/destinations-detail";
import { useEffect } from "react";
import Stays from "./components/pages/stays";
import StaysDetail from "./components/pages/stays/stays-detail";
import StaysBooking from "./components/pages/stays/stays-booking";
import Experiences from "./components/pages/experiences";
import ExperiencesDetail from "./components/pages/experiences/experiences-detail";
import ExperiencesBooking from "./components/pages/experiences/experiences-booking";
import Login from "./components/pages/auth/login";
import Register from "./components/pages/auth/register";
import Profile from "./components/pages/profile";
import { ProtectedRoute } from "./components/context/protected-route";
import NotFound from "./components/pages/not-found";
import EvaluationManager from "./components/evaluation/evaluation-manager";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename="/weltentdecker">
      <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route element={<Layout transparentNavbar />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Login */}
        <Route element={<Layout noLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<Layout noLayout />}>
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Standard pages */}
        <Route element={<Layout />}>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/destinations" element={<Destinations />} />

          <Route path="/destinations/:slug" element={<DestinationDetail />} />

          <Route path="/stays" element={<Stays />} />

          <Route path="/stays/:id" element={<StaysDetail />} />

          <Route path="/stays/:id/booking" element={<StaysBooking />} />

          <Route path="/experiences" element={<Experiences />} />

          <Route path="/experiences/:id" element={<ExperiencesDetail />} />

          <Route
            path="/experiences/:id/booking"
            element={<ExperiencesBooking />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <EvaluationManager />
    </BrowserRouter>
  );
}

export default App;
