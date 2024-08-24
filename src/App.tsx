import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import WebCamComp from "./components/Webcam";

export default function App() {
  const [webCamData, setWebCamData] = useState("");
  const [textInputValue, setTextInputValue] = useState("");
  const [isName, setIsName] = useState(false);

  const change = () => {
    setIsName(!isName);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white text-white p-8 rounded-lg shadow-lg flex flex-col w-1/2 min-h-[200px] max-h-[1000px] flex justify-center items-center">
        {isName ? (
          <WebCamComp
            webCamData={webCamData}
            setWebCamData={setWebCamData}
            name={textInputValue}
          />
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
