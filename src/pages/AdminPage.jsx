import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", pdf);
    formData.append("coverImage", coverImage);
    formData.append("category", category);

    try {
      const res = await axios.post("https://vercel-backend-production-598f.up.railway.app/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "ok") {
        alert("Uploaded!");
        setTitle("");
        setPdf(null);
        setCoverImage(null);
        setCategory("");
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="back-home" onClick={() => navigate("/")}>
        ← Back to Home
      </div>

      <h2>Admin PDF Upload</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" hidden>Select Category</option>
          <option value="Academic & Educational">Academic & Educational</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Comics & Graphic Novels">Comics & Graphic Novels</option>
          <option value="Religious & Spiritual">Religious & Spiritual</option>
          <option value="Career & Skill Development">Career & Skill Development</option>
          <option value="Self Help">Self Help</option>
          <option value="Others">Others</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
