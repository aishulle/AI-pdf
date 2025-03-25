

import { useEffect, useState } from "react";
import { deleteDocuments, getDocuments, sendPDF } from "../services/api";
import Swal from 'sweetalert2';

const Header = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getDocumentsNames();
  }, []);

  const getDocumentsNames = () => {
    getDocuments().then((data) => {
      setDocuments(data.documents || []);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isPDF(file)) {
      Swal.fire("Please upload a PDF file!");
      return;
    }

    if (file.size > 10000000) {
      Swal.fire("File size is too large! Please upload a file less than 10MB.");
      return;
    }

    if (file.size === 0) {
      Swal.fire("File is empty! Please upload a non-empty file.");
      return;
    }

    if (documents.some((doc) => doc.file_name === file.name)) {
      Swal.fire("File already exists! Please upload a new file.");
      return;
    }

    await sendPDF(file);
    getDocumentsNames();
  };

  const isPDF = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    return extension === 'pdf';
  };

  const deleteDocumentsConfirm = () => {
    if (documents.length === 0) {
      Swal.fire("Please upload a PDF first!");
      return;
    }

    Swal.fire({
      title: "Deleting PDFs?",
      text: "Are you sure you want to delete all PDFs?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePDFs();
      }
    });
  };

  const handleDeletePDFs = async () => {
    await deleteDocuments();
    getDocumentsNames();
    window.location.reload();
  };

  return (
    <div className="header d-flex flex-row justify-content-between py-4 font-weight-bold text-black shadow-sm">
      {/* Logo */}
      <div className="col-auto d-flex align-items-center px-3">
        <img
          src="/AI-Planet-Logo.png"
          alt="AI Planet Logo"
          style={{ height: "40px", objectFit: "contain" }}
        />
      </div>

      {/* Document Badges + Upload / Clear Buttons */}
      <div className="header-items col-auto mx-1">
        <div className="d-flex float-start">
          <div className="header-items-files d-flex">
            {documents.map((doc, index) => (
              <div
                className="m-1 badge rounded-pill text-bg-success"
                key={index}
              >
                {doc.file_name}
              </div>
            ))}
          </div>
        </div>

        <div className="header-buttons d-flex">
          {/* Upload PDF */}
          <label
            htmlFor="fileInput"
            className="header-items-PDF px-4 btn btn-outline-dark"
            style={{ fontSize: "0.8rem" }}
          >
            Upload PDF
          </label>
          <input
            type="file"
            id="fileInput"
            className="d-none"
            accept=".pdf"
            onChange={handleFileUpload}
          />

          {/* Clear PDF */}
          <button
            className="mx-1 header-items-clear px-4 btn btn-outline-danger"
            style={{ fontSize: "0.8rem" }}
            onClick={deleteDocumentsConfirm}
          >
            Clear PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
