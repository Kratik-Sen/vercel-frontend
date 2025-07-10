import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Nav from "./Nav";
import "./PdfViewer.css";
import "./Navbar.css";

// ✅ Fix the workerSrc to avoid "require is not defined" error
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/get-files`)
      .then((res) => res.json())
      .then((data) => {
        const match = data.data.find((item) => item._id === id);
        setBook(match);
      });
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return book ? (
    <div className="home">
      <button onClick={() => navigate("/")}>← Back</button>

      <div className="box">
        <h2>{book.title}</h2>

        <div className="PDFANDIMAG">
          {/* Left: Image and Category */}
          <div className="imgANDtitle">
            <img src={book.coverImage} alt={book.title} width={200} />
            <p>
              <strong>Category:</strong> {book.category}
            </p>
          </div>

          {/* Right: PDF Document */}
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
                scale={1}
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
