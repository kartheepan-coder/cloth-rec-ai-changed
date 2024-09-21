import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "./Card";
import { ReactComponent as ArrowBack } from "../assets/arrow_back_2_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContextProvider } from "../Providers/AuthProviders";

export default function Preview() {
  const location = useLocation();
  const state = location.state || {};
  const navigate = useNavigate();
  const [finished, setfinished] = useState(false);

  const [gender, setgender] = useState(state.gender);

  const auth: any = useContext(AuthContextProvider);

  useEffect(() => {
    // Set a timeout to navigate after 30 seconds
    const timer = setTimeout(() => {
      navigate("/");
      auth.setUser({}); // Replace '/your-route' with your target route
    }, 10000); // 30000 ms = 30 seconds

    // Cleanup the timeout if the component is unmounted before 30 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    setgender(state.gender);
  }, [state.gender]);

  useEffect(() => {
    console.log(!finished);
  }, [finished, state.isPurchaseDone]);
  return !finished ? (
    <div className="h-lvh w-lvw flex justify-center items-center">
      <Card>
        <div className="w-[100%]">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </button>
        </div>
        <div className="flex  h-[500px] justify-center items-center ">
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
            {state.top ? (
              <div className="flex gap-1">
                <img
                  src={`http://localhost:5000/api/get-cloth-image?gender=${gender}&image_name=${state.top.image_name}`}
                  alt="Dress Preview"
                  className="w-64 h-64 object-cover rounded-md"
                />{" "}
                <img
                  src={`http://localhost:5000/api/get-cloth-image?gender=${gender}&image_name=${state.bottom.image_name}`}
                  alt="Dress Preview"
                  className="w-64 h-64 object-cover rounded-md"
                />
              </div>
            ) : (
              <p>No Image Available</p>
            )}

            {/* const image =
      `http://127.0.0.1:5000/api/get-cloth-image?gender=female&image_name=$
      {imageData[0]["image_name"]}`; */}

            <button
              className="p-2 m-2 bg-blue-500 rounded mr-2"
              onClick={() => {
                setfinished(!finished);
              }}
            >
              Done
            </button>
          </div>
        </div>
      </Card>
    </div>
  ) : (
    <div className="flex justify-center items-center font-bold text-lg h-lvh text-5xl ">
      👋 Thank you for purchasing
    </div>
  );
}
