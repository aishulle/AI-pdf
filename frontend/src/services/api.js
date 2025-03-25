
import axios from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = 'http://127.0.0.1:8003/api'; // Base URL for all API calls

// Function to send the PDF file to the server
export const sendPDF = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log('File uploaded successfully:', response.data);
        Swal.fire({
            title: "Success!",
            text: "PDF uploaded successfully!",
            icon: "success"
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        
        let errorMessage = "There was an error uploading the file.";
        if (error.response) {
            if (error.response.status === 400) {
                errorMessage = error.response.data.detail || "Invalid file format. Only PDF files are allowed.";
            } else if (error.response.status === 413) {
                errorMessage = "File size is too large!";
            }
        }

        Swal.fire({
            title: "Upload Error",
            text: errorMessage,
            icon: "error"
        });
        throw error;
    }
}

// Function to get the list of documents
export const getDocuments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/documents`);
        return response.data;
    } catch (error) {
        console.error('Error fetching documents:', error);
        Swal.fire({
            title: "Error",
            text: "Failed to load documents",
            icon: "error"
        });
        throw error;
    }
}

// Function to delete all the documents
export const deleteDocuments = async () => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/documents`);
        console.log('Documents deleted:', response.data);
        
        Swal.fire({
            title: "Success!",
            text: "All documents have been deleted.",
            icon: "success"
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting documents:', error);
        Swal.fire({
            title: "Error",
            text: "Failed to delete documents",
            icon: "error"
        });
        throw error;
    }
}

// Function to send a query (unchanged as it's not part of PDF operations)
export const sendQuery = async (message) => {
    try {
        const response = await axios.post("http://127.0.0.1:8003/query/?query=" + message);
        return response.data;
    } catch (error) {
        console.error('Error sending query:', error);
        Swal.fire({
            title: "Error",
            text: "Failed to send query",
            icon: "error"
        });
        throw error;
    }
};
