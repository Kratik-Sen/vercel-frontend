import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const marqueeRef = useRef(null);

  useEffect(() => {
    axios.get("https://vercel-backend-production-598f.up.railway.app/get-files").then((res) => {
      setBooks(res.data.data);
    });
  }, []);

  const handleMouseEnter = () => {
    marqueeRef.current?.stop();
  };

  const handleMouseLeave = () => {
    marqueeRef.current?.start();
  };

  const categories = [
    "Academic & Educational",
    "Fiction",
    "Non-Fiction",
    "Comics & Graphic Novels",
    "Religious & Spiritual",
    "Career & Skill Development",
    "Self Help",
    "Others",
  ];

  return (
    <>
    

      {/* Main content starts here */}
      <div className="home">
        <Nav />
        <marquee
          className="topmarquee"
          direction="left"
          height="70px"
          scrollamount="30"
        >
          ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـRead and Download books for freeﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـ
        </marquee>
  {/* Top horizontal category buttons (always visible) */}
    <div className="btnBOX">  <div className="top-category-bar">
  <span>Category:</span>
        {categories.map((cat) => (
          <button key={cat} onClick={() => navigate(`/category/${cat}`)}>
            {cat}
          </button>
        ))}
      </div></div>
        <div className="home-container">
          {/* Book grid start */}
          <div className="book-grid">
            {books.map((book) => (
              <div
                className="book-card"
                key={book._id}
                onClick={() => navigate(`/view/${book._id}`)}
              >
                <img src={book.coverImage} alt={book.title} width={200} />
                <h5>{book.title}</h5>
                <p style={{ color: "#dbae32", fontSize: "14px" }}>
                  {book.category}
                </p>
              </div>
            ))}
          </div>

          {/* Category Marquee (hidden on small screens) */}
          <div className="cate-box desktop-only">
            <h2>Books Category↓</h2>
            <marquee
              ref={marqueeRef}
              direction="up"
              scrollAmount="18"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="category-buttons">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => navigate(`/category/${cat}`)}>
                    {cat}
                  </button>
                ))}
              </div>
            </marquee>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
