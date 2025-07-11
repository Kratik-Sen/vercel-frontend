import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://vercel-backend-production-598f.up.railway.app/get-files").then((res) => {
      setBooks(res.data.data);
          // console.log("Books fetched:", res.data.data);

    });
  }, []);

  const marqueeRef = useRef(null);

  const handleMouseEnter = () => {
    marqueeRef.current?.stop(); // ✅ Safely call stop
  };

  const handleMouseLeave = () => {
    marqueeRef.current?.start(); // ✅ Safely call start
  };

  return (
    
   <div className="home">
    <Nav/>
      <marquee className="topmarquee" direction="left" height="70px" scrollamount="30" >
		ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـRead and Download books for freeﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـ
	</marquee>
     <div className="home-container">
{/* book grig start */}
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book._id} onClick={() => navigate(`/view/${book._id}`)}>
            <img src={book.coverImage} alt={book.title} width={200} />
            <h5>{book.title}</h5>
            <p style={{ color: "#dbae32", fontSize: "14px" }}>{book.category}</p>
          </div>
        ))}
      </div>
{/* book grig end */}
{/* cate-box start */}
 <div className="cate-box">
  <h2>Books Category↓</h2>
      <marquee
        ref={marqueeRef}
        direction="up"
        scrollAmount="10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="category-buttons">
          {[
            "Academic & Educational",
            "Fiction",
            "Non-Fiction",
            "Comics & Graphic Novels",
            "Religious & Spiritual",
            "Career & Skill Development",
            "Self Help",
            "Others",
          ].map((cat) => (
            <button key={cat} onClick={() => navigate(`/category/${cat}`)}>
              {cat}
            </button>
          ))}
        </div>
      </marquee>
    </div>
{/* cate-box end */}
    </div>
   </div>
  );
}

export default Home;
