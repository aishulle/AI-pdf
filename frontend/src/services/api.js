// import axios from 'axios';
// import Swal from 'sweetalert2'

// // Function to send the PDF file to the server
// export const sendPDF = async (file) => {
//     // Create a FormData object
//     try {
//         const formData = new FormData();
//         // Append the file to the FormData object
//         formData.append('file', file);
//         // Send the PDF file to the server
//         const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         });
//         console.log('File uploaded successfully:', response.data);
//         Swal.fire({
//             title: "Good job!",
//             text: "PDF uploaded successfully!",
//             icon: "success"
//         });
//     } catch (error) {
//         if (error.response && error.response.status === 400) {
//             // Show an error message if the file already exists
//             Swal.fire({
//                 title: "File Already Exists",
//                 text: "The file you are trying to upload already exists.",
//                 icon: "warning"
//             });
//         } else {
//             // Show an error message if there was an error uploading the file
//             Swal.fire({
//                 title: "Upload Error",
//                 text: "There was an error uploading the file.",
//                 icon: "error"
//             });
//             console.error('Error uploading file:', error);
//         }
//     }
// }

// // Function to send a message
// export const sendQuery = async (message) => {
//     try {
//         // Send the message to the server
//         const response = await axios.post("http://127.0.0.1:8001/query/?query=" + message);
//         // Return the response
//         return response.data;
//     } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//         throw error;
//     }
// };

// // Function to delete all the documents
// export const deleteDocuments = async () => {
//     try {
//         // Send a request to the server to delete all the documents
//         const response = await axios.post("http://127.0.0.1:8001/clear-document-store");
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//     }
//     // Show a success message
//     Swal.fire({
//         title: "Deleted!",
//         text: "Your file has been deleted.",
//         icon: "success"
//     });
// }

// // Function to get the list of documents
// export const getDocuments = async () => {
//     try {
//         // Send a request to the server to get the list of documents
//         const response = await axios.post("http://127.0.0.1:8001/get-all-documents");
//         return response.data;
//     }
//     // Show an error message if there was an error getting the documents
//     catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//     }
// }
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