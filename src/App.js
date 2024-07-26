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

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<ProtectedRoute component={User} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
        <Toaster />
      </AuthProvider>
    </>
  );
}
function ProtectedRoute({ component: Component }) {
  const [authUser] = useAuth();

  return authUser ? <User /> : <Navigate to="/signup" />;
}

export default App;
