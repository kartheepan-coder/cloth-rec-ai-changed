import { Box } from "@mui/material";
import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import { ReactComponent as UploadSvg } from "../assets/cloud_upload_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";
import { AuthContextProvider } from "../Providers/AuthProviders";
import { upload } from "@testing-library/user-event/dist/upload";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebCamComp = ({ webCamData, name }: any) => {
  const webcamRef = useRef<Webcam>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const backendUrl = "http://127.0.0.1:5000/api"; // Replace with your backend URL
  const [isCaptured, setIsCaptured] = useState(false);
  const [uploadedFileName, setuploadedFileName] = useState("");
  const [isUpload, setisUpload] = useState(false);
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState<string>("");
  const [redirect, setredirect] = useState(false);

  const [faceTone, setfaceTone] = useState("");
  const navigate = useNavigate();

  const auth: any = useContext(AuthContextProvider);

  useEffect(() => {
    initiateImageSegmentation(uploadedFileName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFileName]);

  useEffect(() => {
    console.log(auth.user);
    console.log(auth.user["name"]);
  }, [auth.user]);

  useEffect(() => {
    if (redirect) {
      console.log(userName, userGender);
      const someProps = {
        name: userName,
        gender: userGender.toLowerCase(),
        faceTone: faceTone,
      };
      navigate("/profile", { state: someProps });
    }
  }, [redirect]);
  useEffect(() => {
    handleUpload(selectedFile);
  }, [selectedFile]);
  useEffect(() => {
    console.log(isUpload);
  }, [isUpload]);

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
      htmlFormData.append("name", auth.user["name"]);

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
      // console.log(response);
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponseStatus("An error occurred while uploading the image.");
    }
  };

  const capture = () => {
    setIsCaptured(!isCaptured);
    if (webcamRef.current && !isCaptured) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      // setWebCamData(imageSrc);
      sendImageToBackend(imageSrc as string);
    } else {
      setImageSrc(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file as File);
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
        // auth.setUser({ ...auth.user, filename: uploadedFileName });
      } else {
        setResponseStatus("Failed to upload image.");
      }
      // console.log(response);
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponseStatus("An error occurred while uploading the image.");
    }
  };

  const initiateImageSegmentation = async (filename: string) => {
    // console.log(filename);
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
                name: auth.user["name"],
                filename: uploadedFileName,
              }),
            });

            if (response.ok) {
              const data = await response.json();
              const user = data[0];
              setUserName(user["name"]);
              setUserGender(user["gender"]);
              setfaceTone(user["facetone"]);
              auth.setUser({
                ...auth.user,
                userGender: user["gender"],
                faceTone: user["facetone"],
                filename: uploadedFileName,
              });
              setredirect(!redirect);

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
    <div className="flex items-center justify-center w-full mt-8 flex-col">
      {isUpload ? (
        <Card>
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
        </Card>
      ) : !imageSrc ? (
        // />
        <div className="flex justify-center items-center flex-col">
          <Webcam
            audio={false}
            height={1000}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
            className="rounded-2xl"
          />
          <div className="flex">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-1"
              onClick={capture}
            >
              Capture
            </button>
            <button onClick={() => setisUpload(!isUpload)}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  bgcolor: "rgb(31 41 55)",

                  marginRight: "20px",
                  width: "30px",
                  height: "30px",
                  "& svg": {
                    m: 1,
                  },
                  "& hr": {
                    mx: 0.5,
                  },
                }}
              >
                <UploadSvg />
              </Box>
            </button>
          </div>
        </div>
      ) : (
        <img src={imageSrc} alt="Captured" />
      )}
      {/* 

      <div className="flex justify-center items-center">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-1"
          onClick={capture}
        >
          Capture
        </button>
        <button onClick={() => setisUpload(!isUpload)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              bgcolor: "rgb(31 41 55)",

              marginRight: "20px",
              width: "30px",
              height: "30px",
              "& svg": {
                m: 1,
              },
              "& hr": {
                mx: 0.5,
              },
            }}
          >
            <UploadSvg />
          </Box>
        </button>
      </div>

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

const FileUpload = (handleFileChange: ChangeEventHandler) => {
  return (
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
            <span className="font-semibold">Click to upload</span> or drag and
            drop
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
  );
};
