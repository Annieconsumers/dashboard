import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import AllRoutes from "./routes/AllRoutes.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/all/*"
          element={
            <ProtectedRoute type="Super Admin">
              <AllRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
