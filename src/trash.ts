export {};
// import React, { useRef, useState, useEffect } from "react";
// import "./App.css";

// export default function App() {
//   const videoPlayer = useRef<HTMLVideoElement>(null);
//   const camera = useRef<HTMLCanvasElement>(null);
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [frontCamera, setFrontCamera] = useState(true);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [capturedImageSize, setCapturedImageSize] = useState<string | null>(
//     null
//   );
//   const [fileName, setFileName] = useState("React Image");
//   const [fileType, setFileType] = useState("png");

//   const constraints: MediaStreamConstraints = {
//     video: {
//       facingMode: frontCamera ? "user" : "environment",
//     },
//     audio: false,
//   };

//   const openCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then((stream) => {
//         setCameraOpen(true);
//         if (videoPlayer.current) {
//           videoPlayer.current.srcObject = stream;
//           videoPlayer.current.play();
//         }
//       })
//       .catch((err) => {
//         setCameraOpen(false);
//         console.log("An error occurred: " + err);
//       });
//   };

//   const closeCamera = () => {
//     if (videoPlayer.current?.srcObject) {
//       (videoPlayer.current.srcObject as MediaStream)
//         .getTracks()
//         .forEach((track) => {
//           track.stop();
//         });
//       setCameraOpen(false);
//     }
//   };

//   const captureImage = () => {
//     if (camera.current && videoPlayer.current) {
//       const context = camera.current.getContext("2d");
//       if (context) {
//         context.drawImage(videoPlayer.current, 0, 0, 360, 360);
//         camera.current.toBlob((blob) => {
//           if (blob) {
//             handleCapturedImage(blob);
//           }
//         });
//       }
//     }
//   };

//   const handleCapturedImage = (blob: Blob) => {
//     let reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onload = () => {
//       if (reader.result) {
//         setCapturedImage(reader.result as string);
//         let sz = formatFileSize(blob.size);
//         setCapturedImageSize(sz);
//       }
//     };
//   };

//   const downloadRecording = () => {
//     if (capturedImage) {
//       let filename = `${fileName}.${fileType}`;
//       downloadFile(capturedImage, filename);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>React Image Capture</h1>

//       {!cameraOpen ? (
//         <button onClick={openCamera}>Open Camera</button>
//       ) : (
//         <div>
//           <button onClick={closeCamera}>Close Camera</button>
//           <button onClick={captureImage}>Capture Image</button>
//           <div>
//             <label>Front Camera</label>
//             <input
//               type="checkbox"
//               checked={frontCamera}
//               onChange={() => setFrontCamera(!frontCamera)}
//             />
//           </div>
//         </div>
//       )}

//       {capturedImage && (
//         <div>
//           <button onClick={downloadRecording}>
//             Download {capturedImageSize}
//           </button>
//           <input
//             type="text"
//             placeholder="File name to download"
//             value={fileName}
//             onChange={(e) => setFileName(e.target.value)}
//           />
//           <select
//             value={fileType}
//             onChange={(e) => setFileType(e.target.value)}
//           >
//             <option value="png">png</option>
//             <option value="jpg">jpg</option>
//           </select>
//         </div>
//       )}

//       {cameraOpen && <video ref={videoPlayer} controls autoPlay></video>}

//       <canvas
//         width="360"
//         height="360"
//         ref={camera}
//         style={{ display: "none" }}
//       />
//     </div>
//   );
// }

// const downloadFile = (url: string, fileName: string) => {
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = fileName || "downloaded-file";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const formatFileSize = (bytes: number, decimalPoint?: number) => {
//   if (bytes === 0) return "0 Bytes";
//   const k = 1000;
//   const dm = decimalPoint || 2;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
// };
