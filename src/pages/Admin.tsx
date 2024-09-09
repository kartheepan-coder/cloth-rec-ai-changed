import { Card } from "../components/Card";
import { ReactComponent as MaleSvg } from "../assets/male_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { ReactComponent as FemaleSvg } from "../assets/female_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { ReactComponent as ShirtSvg } from "../assets/apparel_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { ReactComponent as PantSvg } from "../assets/long-jeans-fashion-clothes-style-garment-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { FileUpload } from "../App";

export default function Admin() {
  const [selection, setselection] = useState("");
  const [responseStatus, setResponseStatus] = useState<string | null>(null);

  const [dressType, setdressType] = useState("");
  const backendUrl = "http://127.0.0.1:5000/api"; // Replace with your backend URL
  const [uploadedFileName, setuploadedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file as File);
  };

  useEffect(() => {
    initiateImageSegmentation(uploadedFileName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFileName]);
  useEffect(() => {
    // sendImageToBackend(selectedFile as string);
    handleUpload(selectedFile);
  }, [selectedFile]);

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Convert base64 to Blob
      // const blob = await fetch(image, { mode: "no-cors" }).then((res) =>
      //   res.blob()
      // );

      // Create htmlFormData and append the image
      const htmlFormData = new FormData();

      htmlFormData.append("file", file);
      htmlFormData.append("type", dressType);
      htmlFormData.append("gender", selection);

      // Send the image to the backend
      const response = await fetch(backendUrl + "/clotheUpload", {
        method: "POST",
        body: htmlFormData,
      });

      if (response.ok) {
        const filename = await response.json();
        // console.log(filename["filename"]);
        // console.log(response.json());
        setResponseStatus("Image uploaded successfully!");
        setuploadedFileName(filename["filepath"]);
      } else {
        // setResponseStatus("Failed to upload image.");
      }
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

        const change = async () => {
          try {
            const response = await fetch(backendUrl + "/color", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                filename: uploadedFileName,
                is_dress: "true",
              }),
            });

            if (response.ok) {
              // handleRedirect();
            } else {
              console.log("Nah");
            }
          } catch (error) {
            console.error(error);
          }
        };

        if (response.ok) {
          change();
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(response.json());
  };

  return (
    <div className="h-svh w-svw flex flex-row justify-center items-center">
      <Card>
        {selection === "" ? (
          <div className="flex flex-row w-[400px] justify-around p-20">
            <button onClick={() => setselection("MEN")}>
              <div className="flex justify-center items-center p-4 bg-gray-200 rounded-lg">
                <MaleSvg fill="black" />
              </div>
            </button>
            <button onClick={() => setselection("WOMEN")}>
              <div className="flex justify-center items-center p-4 bg-gray-200 rounded-lg">
                <FemaleSvg fill="black" />
              </div>
            </button>
          </div>
        ) : dressType === "" ? (
          <div className="flex flex-row w-[400px] justify-around p-20">
            <button onClick={() => setdressType("top")}>
              <div className="flex justify-center items-center p-4 bg-gray-200 rounded-lg">
                <ShirtSvg fill="black" />
              </div>
            </button>
            <button onClick={() => setdressType("bottom")}>
              <div className="flex justify-center items-center p-4 bg-gray-200 rounded-lg">
                <PantSvg fill="black" height={24} width={24} />
              </div>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
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
                    // stroke-linecap="round"
                    // stroke-linejoin="round"
                    // stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPEG or JPG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </Card>
    </div>
  );
}
