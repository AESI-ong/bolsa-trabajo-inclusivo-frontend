import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <nav className="space-x-4 mb-4">
          <Link to="/" className="text-blue-600 underline">
            Home
          </Link>
          <Link to="/about" className="text-blue-600 underline">
            About
          </Link>
          <Link to="/jobs" className="text-blue-600 underline">
            Jobs
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<h1 className="text-3xl font-bold">Home Page</h1>}
          />
          <Route
            path="/about"
            element={<h1 className="text-3xl font-bold">About Us</h1>}
          />
          <Route
            path="/jobs"
            element={<h1 className="text-3xl font-bold">Job Listings</h1>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
