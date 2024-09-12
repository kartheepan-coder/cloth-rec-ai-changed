import { Box } from "@mui/material";

import { unescape } from "querystring";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckOut() {
  const location = useLocation();
  const state = location.state as { gender: string };
  const [selectedColor, setSelectedColor] = useState(""); // Default color
  const [imageData, setImageData] = useState<ImageData[]>([]); // To store the fetched image data
  const [colorCategory, setColorCategory] = useState("medium"); // Color category input
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null);
  const [colors, setcolors] = useState<string[]>();
  const [gender, setgender] = useState("male");
  const [type, settype] = useState("top");
  const navigate = useNavigate();
  const [selectedTop, setSelectedTop] = useState<ImageData | undefined>(
    undefined
  );
  const [selectedBottom, setSelectedBottom] = useState<ImageData | undefined>(
    undefined
  );

  useEffect(() => {
    setColorCategory("dark");
  }, []);

  useEffect(() => {
    console.log(selectedBottom, selectedTop);
  }, [selectedBottom, selectedTop]);

  useEffect(() => {
    setgender(state["gender"]);
    fetchImageData();
  }, [state, type]);

  useEffect(() => {
    fetchImageData();
  }, [gender, colorCategory, type]);

  useEffect(() => {
    if (imageData && imageData.length > 0) {
      // Extract prominent colors into an array
      const extractedColors = imageData.map((item) => item.prominent_color);
      setcolors(extractedColors); // Store colors in the state
      setSelectedColor(
        extractedColors[Math.floor(Math.random() * extractedColors.length)]
      );
    }
  }, [imageData, gender, colorCategory, type]);
  const fetchImageData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/get-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color_category: colorCategory,
          gender: gender,
          type: type,
        }), // Send color category in request body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: ImageData[] = await response.json();
      if (response.ok) {
        setImageData(data);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleBuy = () => {
    if (type === "top") {
      const selectedTopItem = imageData.find(
        (item) => item.prominent_color === selectedColor
      );
      setSelectedTop(selectedTopItem);
      settype("bottom"); // Switch to selecting bottom clothes
    } else if (type === "bottom") {
      const selectedBottomItem = imageData.find(
        (item) => item.prominent_color === selectedColor
      );
      setSelectedBottom(selectedBottomItem);
    }
  };

  useEffect(() => {
    if (selectedTop && selectedBottom) {
      navigate("/preview", {
        state: { top: selectedTop, bottom: selectedBottom },
      });
    }
  }, [selectedTop, selectedBottom, navigate]);
  useEffect(() => {
    console.log(selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-4/5 h-[80vh] border border-gray-300 rounded-lg overflow-hidden bg-white">
        {colors !== undefined ? (
          <ColorPalette
            colors={colors}
            onColorSelect={setSelectedColor}
            setColorCategory={setColorCategory}
            selectedColor={selectedColor}
            setType={handleBuy}
            type={type}
          />
        ) : null}
        {imageData !== undefined ? (
          <DressPreview
            selectedColor={selectedColor}
            imageData={imageData}
            gender={gender}
          />
        ) : (
          <>error</>
        )}
      </div>
    </div>
    // <div className="bg-red-500 h-[100vh] flex justify-center items-center">
    //   <div className="bg-black w-[100vw] h-4/5 mx-40 rounded-lg flex flex-row">
    //     <div className="bg-yellow-300 w-[auto] h-3/4 mx-20 rounded-lg ">
    //       <h1>hiiii</h1>
    //     </div>
    //     <div className="bg-yellow-300 w-[auto] h-3/4 mx-20 rounded-lg "></div>
    //   </div>
    // </div>
  );
}

const DressPreview = ({
  selectedColor,
  imageData,
  gender,
}: DressPreviewProps) => {
  const selectedImageData = imageData.find(
    (item) => item.prominent_color === selectedColor
  );

  // const image = `http://127.0.0.1:5000/api/get-cloth-image?gender=female&image_name=${imageData[0]["image_name"]}`;
  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      {/* <div
        className={`w-64 h-96  flex justify-center items-center text-white rounded-md`}
        style={{ backgroundColor: selectedColor }}
      > */}

      {/* <img
        src={`http://localhost:5000/api/get-cloth-image?gender=female&image_name=71YkLXiwLYL._AC_SY879_.jpg`}
        alt={"summa"}
        className="w-64 h-64 object-cover rounded-md"
      /> */}
      {selectedImageData ? (
        <img
          src={`http://localhost:5000/api/get-cloth-image?gender=${gender}&image_name=${selectedImageData.image_name}`}
          alt="Dress Preview"
          className="w-64 h-64 object-cover rounded-md"
        />
      ) : (
        <p>No Image Available</p>
      )}

      {/* const image =
      `http://127.0.0.1:5000/api/get-cloth-image?gender=female&image_name=$
      {imageData[0]["image_name"]}`; */}
      <p>Dress Preview</p>
    </div>
    // </div>
  );
};

const ColorPalette = ({
  colors,
  onColorSelect,
  setColorCategory,
  selectedColor,
  setType,
  type,
}: ColorPaletteProps) => {
  return (
    <div className="flex-1 p-4 flex-col items-center justify-center content-center">
      <h1 className="font-bold">Choose your {type.toLocaleUpperCase()}</h1>
      <div className="flex-col items-center">
        <button
          className="p-2 m-2 bg-gray-200 rounded"
          onClick={() => setColorCategory("light")}
        >
          Light
        </button>
        <button
          className="p-2 m-2 bg-gray-200 rounded"
          onClick={() => setColorCategory("medium")}
        >
          Medium
        </button>
        <button
          className="p-2 m-2 bg-gray-200 rounded"
          onClick={() => setColorCategory("dark")}
        >
          Dark
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Select a Color:</h3>
        <div className="flex flex-row flex-wrap gap-5">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-16 h-16  cursor-pointer rounded-md ${
                selectedColor === color
                  ? `outline outline-2 outline-red-300`
                  : ``
              } `}
              onClick={() => onColorSelect(color)}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
        <button className="p-2 m-2 bg-blue-500 rounded mr-2" onClick={setType}>
          Buy
        </button>
      </div>
    </div>
  );
};
interface ImageData {
  image_name: string;
  prominent_color: string;
}

interface DressPreviewProps {
  selectedColor: string;
  imageData: ImageData[];
  gender: string;
}

interface ColorPaletteProps {
  colors: string[];
  onColorSelect: (color: string) => void;
  setColorCategory: any;
  selectedColor: string;
  setType: any;
  type: string;
}
