import { Box } from "@mui/material";
import { cp } from "fs";
import { useState } from "react";

export default function CheckOut() {
  const [selectedColor, setSelectedColor] = useState("red"); // Default color

  const colors = ["red", "blue", "green", "yellow", "purple", "black"];
  const hexColors = [
    "#FF5733", // Orange Red
    "#33FF57", // Lime Green
    "#3357FF", // Royal Blue
    "#FF33A6", // Hot Pink
    "#33FFF5", // Aqua
    "#FFDB33", // Gold
  ];
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-4/5 h-[80vh] border border-gray-300 rounded-lg overflow-hidden bg-white">
        {/* Left Side: Dress Preview */}

        {/* Right Side: Color Palette */}
        <ColorPalette colors={hexColors} onColorSelect={setSelectedColor} />
        <DressPreview selectedColor={selectedColor} />
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

const DressPreview = ({ selectedColor }: DressPreviewProps) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div
        className={`w-64 h-96  flex justify-center items-center text-white rounded-md`}
        style={{ backgroundColor: selectedColor }}
      >
        <p>Dress Preview</p>
      </div>
    </div>
  );
};

const ColorPalette = ({ colors, onColorSelect }: ColorPaletteProps) => {
  return (
    <div className="flex-1 p-4 flex-col items-center justify-center content-center">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select a Color:</h3>
        <div className="flex flex-row flex-wrap gap-5">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-16 h-16  cursor-pointer rounded-md`}
              onClick={() => onColorSelect(color)}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DressPreviewProps {
  selectedColor: string;
}

interface ColorPaletteProps {
  colors: string[];
  onColorSelect: (color: string) => void;
}
