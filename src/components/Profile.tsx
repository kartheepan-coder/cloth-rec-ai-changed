import React, { ReactElement } from "react";
import { Card, Button } from "./Card";
import image from "../assets/53a013b7b03234d99cb20cf346f77b88.jpg";
import myImg from "../assets/WhatsApp Image 2024-05-22 at 19.29.23.jpeg";
import Divider from "@mui/material/Divider";

import { ReactComponent as MaleSvg } from "../assets/male_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { ReactComponent as FemaleSvg } from "../assets/female_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

import { ReactComponent as ArrowBack } from "../assets/arrow_back_2_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { Box } from "@mui/material";

export default function Profile() {
  return (
    <div className=" h-lvh flex justify-around items-center ">
      <Card>
        <div className="flex justify-start pb-[0.5rem]">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <ArrowBack />
          </button>
        </div>
        <div className="flex justify-around items-center pb-10">
          <img
            className="mb-3 rounded-2xl shadow-lg object-center w-[200px] max-h-auto "
            src={myImg}
            alt="profile image"
          />

          {/* <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
          <div className="flex mt-4 md:mt-6"></div> */}

          <SideInfo />
        </div>
      </Card>
    </div>
  );
}

const SideInfo = () => {
  return (
    <div className="h-full bg-white flex flex-col justify-evenly h-[300px] w-[500px] rounded-2xl mb-[10px]">
      <SideInfoRenderer
        info="Name:"
        name="Karthee"
        row={
          <div className="mr-[20px] text-[[rgb(31 41 55]] font-sans font-bold">
            Kartheepan
          </div>
        }
      />
      <Divider />
      <SideInfoRenderer
        info="Gender:"
        name="male"
        row={<GenderRow gender={"male"} />}
      />
      <Divider />
      <SideInfoRenderer info="Skintone:" name="dark" row={<ColorPicker />} />
    </div>
  );
};

interface SideInfoRendererProps {
  info: string;
  name: string;
  row: ReactElement;
}

const SideInfoRenderer = ({ info, name, row }: SideInfoRendererProps) => {
  return (
    <div className="flex  justify-between ml-[10px] mt-[10px] items-center">
      <div className="flex font-bold font-mono ">{info}</div>
      {row}
    </div>
  );
};

const GenderRow = ({ gender }: { gender: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "rgb(31 41 55)",
        color: "text.secondary",
        marginRight: "20px",
        "& svg": {
          m: 1,
        },
        "& hr": {
          mx: 0.5,
        },
      }}
    >
      <MaleSvg fill={gender === "male" ? "yellow" : "white"} />
      <Divider
        orientation="vertical"
        flexItem
        className="bg-white text-red-500"
      />
      <FemaleSvg fill={gender !== "male" ? "yellow" : "white"} />
    </Box>
  );
};

const ColorPicker = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        borderRadius: 1,
        bgcolor: "rgb(182 125 121)",

        marginRight: "20px",
        width: "89px",
        height: "40px",
        "& svg": {
          m: 1,
        },
        "& hr": {
          mx: 0.5,
        },
      }}
    ></Box>
  );
};
