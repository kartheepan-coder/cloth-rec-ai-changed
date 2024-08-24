import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebCamComp = ({ webCamData, setWebCamData, name }: any) => {
  const webcamRef = useRef<Webcam>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const backendUrl = "http://127.0.0.1:5000/api"; // Replace with your backend URL
  const [isCaptured, setIsCaptured] = useState(false);
  const [uploadedFileName, setuploadedFileName] = useState("");

  useEffect(() => {
    initiateImageSegmentation(uploadedFileName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFileName]);

  const capture = () => {
    setIsCaptured(!isCaptured);
    if (webcamRef.current && !isCaptured) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      setWebCamData(imageSrc);
      sendImageToBackend(imageSrc as string);
    } else {
      setImageSrc(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const sendImageToBackend = async (image: string) => {
    try {
      // Convert base64 to Blob
      const blob = await fetch(image, { mode: "no-cors" }).then((res) =>
        res.blob()
      );

      // Create htmlFormData and append the image
      const htmlFormData = new FormData();

      htmlFormData.append("file", blob, "captured-image.jpg");
      htmlFormData.append("name", name);

      // Send the image to the backend
      const response = await fetch(backendUrl + "/upload", {
        method: "POST",
        body: htmlFormData,
      });

      if (response.ok) {
        const filename = await response.json();
        setResponseStatus("Image uploaded successfully!");
        setuploadedFileName(filename["filename"]);
      } else {
        setResponseStatus("Failed to upload image.");
      }
      console.log(response);
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponseStatus("An error occurred while uploading the image.");
    }
  };

  const initiateImageSegmentation = async (filename: string) => {
    console.log(filename);
    if (filename) {
      try {
        const response = await fetch(backendUrl + "/segment", {
          method: "POST",
          body: JSON.stringify({ filename: uploadedFileName }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.json());
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(response.json());
  };

  return (
    <div className="flex items-center justify-center w-full mt-8 flex-col">
      {!imageSrc ? (
        <Webcam
          audio={false}
          height={1000}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
          className="rounded-2xl"
        />
      ) : (
        <img src={imageSrc} alt="Captured" />
      )}

      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-1"
        onClick={capture}
      >
        Capture
      </button>

      {responseStatus && <p>{responseStatus}</p>}
      {/* <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload File</button>
          {responseStatus && <p>{responseStatus}</p>}
        </div> */}
    </div>
  );
};

export default WebCamComp;
