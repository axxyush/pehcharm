import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import User from "./components/User";
import Signup from "./components/Signup";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
        <Toaster />
        <SpeedInsights />
      </Router>
    </AuthProvider>
  );
}

function MainLayout() {
  const [authUser] = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/user"
          element={<ProtectedRoute component={User} authUser={authUser} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:username" element={<Profile />} />
        <Route
          path="/:username/addblog"
          element={<ProtectedRoute component={AddBlog} authUser={authUser} />}
        />
        <Route path="/:username/blogs" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  );
}

function ProtectedRoute({ component: Component, authUser }) {
  return authUser ? <Component /> : <Navigate to="/signup" />;
}

export default App;
