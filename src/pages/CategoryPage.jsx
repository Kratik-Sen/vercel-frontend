import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import "./Category.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://vercel-backend-production-598f.up.railway.app/get-files").then((res) => {
      const filtered = res.data.data.filter(
        (book) => book.category === category
      );
      setBooks(filtered);
    });
  }, [category]);

  return (
    <div className="home">
      <Nav />
      <h2 style={{textAlign: "center", marginTop: "10px"}}>{category} Books</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div
            className="book-card"
            key={book._id}
            onClick={() => navigate(`/view/${book._id}`)}
          >
            <img src={book.coverImage} alt={book.title} width={200} />
            <h5>{book.title}</h5>
            <p style={{ color: "gray", fontSize: "14px" }}>{book.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
