import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PdfViewer.css";
import Nav from "./Nav";
import "./Navbar.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1); // 👈 scale state
  const navigate = useNavigate();

  useEffect(() => {
    // Set scale based on screen width
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 395) setScale(0.5);
      else if (width < 495) setScale(0.6);
      else if (width < 595) setScale(0.7);
      else if (width < 768) setScale(0.8);
      else if (width < 1024) setScale(0.9);
      else setScale(1.1);
    };

    handleResize(); // Set on load
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(`https://vercel-backend-production-598f.up.railway.app/get-files`)
      .then((res) => res.json())
      .then((data) => {
        const match = data.data.find((item) => item._id === id);
        setBook(match);
      });
  }, [id]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return book ? (
    <div className="home">
      <button onClick={() => navigate("/")}>← BACK</button>
      <div className="box">
        <h2>{book.title}</h2>
        <div className="PDFANDIMAG">
          <div className="imgANDtitle">
            <img src={book.coverImage} alt={book.title} width={200} />
            <p>
              <strong>Category:</strong> {book.category}
            </p>
          </div>

          <Document
            className="Document"
            file={book.pdf}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={scale} // ✅ responsive scale
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}

export default PdfViewer;
