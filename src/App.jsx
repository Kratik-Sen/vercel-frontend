import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import PdfViewer from "./pages/PdfViewer";
import CategoryPage from "./pages/CategoryPage"; // New
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/view/:id" element={<PdfViewer />} />
      <Route path="/category/:category" element={<CategoryPage />} /> {/* New */}
    </Routes>
  );
}

export default App;
