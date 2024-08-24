/* eslint-disable @typescript-eslint/no-use-before-define */
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import "./App.css";
// import Webcam from "react-webcam";

// export default function App() {
//   const webcamRef = useRef<Webcam>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [responseStatus, setResponseStatus] = useState<string | null>(null);
//   const backendUrl = "http://127.0.0.1:5000/upload"; // Replace with your backend URL

//   const capture = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImageSrc(imageSrc);
//       if (imageSrc) {
//         sendImageToBackend(imageSrc);
//       }
//     }
//   }, [webcamRef]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     setSelectedFile(file);
//   };

//   const sendImageToBackend = async (image: string) => {
//     try {
//       // Convert base64 to Blob
//       const blob = await fetch(image).then((res) => res.blob());

//       // Create htmlFormData and append the image
//       const htmlFormData = new htmlFormData();
//       htmlFormData.append("file", blob, "captured-image.jpg");

//       // Send the image to the backend
//       const response = await fetch(backendUrl, {
//         method: "POST",
//         body: htmlFormData,
//       });

//       if (response.ok) {
//         setResponseStatus("Image uploaded successfully!");
//       } else {
//         setResponseStatus("Failed to upload image.");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setResponseStatus("An error occurred while uploading the image.");
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setResponseStatus("No file selected.");
//       return;
//     }

//     try {
//       const htmlFormData = new htmlFormData();
//       htmlFormData.append("file", selectedFile);

//       const response = await fetch(backendUrl, {
//         method: "POST",
//         body: htmlFormData,
//       });

//       if (response.ok) {
//         setResponseStatus("File uploaded successfully!");
//       } else {
//         setResponseStatus("Failed to upload file.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setResponseStatus("An error occurred while uploading the file.");
//     }
//   };

//   useEffect(() => {
//     // Any additional setup can be done here
//   }, []);

//   return (
//     <>
//       <Webcam
//         audio={false}
//         height={200}
//         ref={webcamRef}
//         screenshothtmlFormat="image/jpeg"
//         width={200}
//         videoConstraints={videoConstraints}
//         style={{
//           position: "absolute",
//           top: "100px",
//           left: "100px",
//         }}
//       />
//       <button onClick={capture}>Capture photo</button>
//       {imageSrc && <img src={imageSrc} alt="Captured" />}
//       {responseStatus && <p>{responseStatus}</p>}
//       <div>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Upload File</button>
//         {responseStatus && <p>{responseStatus}</p>}
//       </div>
//     </>
//   );
// }

export {};
