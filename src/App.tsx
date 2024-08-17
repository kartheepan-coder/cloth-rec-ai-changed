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

import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const callouts = [
  {
    description: "Men",
    // description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    description: "Women",
    // description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
];

export default function App() {
  const [webCamData, setWebCamData] = useState("");
  const [textInputValue, setTextInputValue] = useState("");
  const [isName, setIsName] = useState(false);

  useEffect(() => {
    console.log(textInputValue, webCamData);
  }, [textInputValue, webCamData]);

  useEffect(() => {
    console.log("I'm in");
  }, []);
  const change = () => {
    setIsName(!isName);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white text-white p-8 rounded-lg shadow-lg flex flex-col w-1/2 min-h-[200px] max-h-[1000px] flex justify-center items-center">
        {isName ? (
          <WebCam webCamData={webCamData} setWebCamData={setWebCamData} />
        ) : (
          <>
            <TextInput
              textInputValue={textInputValue}
              setTextInputValue={setTextInputValue}
            />
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-1"
              onClick={change}
            >
              Enter
            </button>
          </>
        )}

        {/* <FileUpload /> */}
      </div>
    </div>
  );
}

const TextInput = ({ textInputValue, setTextInputValue }: any) => {
  const handleInputChange = (event: any) => {
    setTextInputValue(event.target.value);
  };
  return (
    <div className="flex max-w-[500px]">
      <span className="inline-flex items-center px-3 text-sm text-white bg-white border   rounded-e-0 border-e-0 rounded-s-md dark:bg-white dark:text-white dark:border-black">
        <svg
          className="w-4 h-4 text-blue-500 dark:text-blue-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      </span>
      <input
        type="text"
        id="website-admin"
        value={textInputValue}
        onChange={handleInputChange}
        className="rounded-none rounded-e-lg bg-blue-500 text-white  block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-red focus-visible:outline-none"
        placeholder="Mayoorathan"
      />
    </div>
  );
};
const FileUpload = () => {
  return (
    <div className="flex items-center justify-center w-full mt-8">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

const WebCam = ({ webCamData, setWebCamData }: any) => {
  const webcamRef = useRef<Webcam>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const backendUrl = "http://127.0.0.1:4444/upload"; // Replace with your backend URL
  const [isCaptured, setIsCaptured] = useState(false);
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

      // Send the image to the backend
      const response = await fetch(backendUrl, {
        method: "POST",
        body: htmlFormData,
      });

      if (response.ok) {
        setResponseStatus("Image uploaded successfully!");
      } else {
        setResponseStatus("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponseStatus("An error occurred while uploading the image.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setResponseStatus("No file selected.");
      return;
    }

    try {
      const htmlFormData = new FormData();
      htmlFormData.append("file", selectedFile);

      const response = await fetch(backendUrl, {
        method: "POST",
        body: htmlFormData,
      });

      if (response.ok) {
        setResponseStatus("File uploaded successfully!");
      } else {
        setResponseStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponseStatus("An error occurred while uploading the file.");
    }
  };

  // useEffect(() => {
  //   // Any additional setup can be done here
  // }, []);

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

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

// {<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//   <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
//     <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

//     <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
//       {callouts.map((callout) => (
//         <div key={callout.description} className="group relative">
//           <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
//             <img
//               alt={callout.imageAlt}
//               src={callout.imageSrc}
//               className="h-full w-full object-cover object-center"
//             />
//           </div>
//           {/* <h3 className="mt-6 text-sm text-gray-500">
//             <a href={callout.href}>
//               <span className="absolute inset-0" />
//               {callout.name}
//             </a>
//           </h3> */}
//           <p className="text-base font-semibold text-gray-900">
//             {callout.description}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>}
export function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
