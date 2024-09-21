import { useContext, useEffect, useState } from "react";
import { Button, Card } from "../components/Card";
import { AuthContextProvider } from "../Providers/AuthProviders";
import WebCamComp from "../components/Webcam";

export default function Signup() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");
  const [phone, setphone] = useState("");
  const backendUrl = "http://127.0.0.1:5000/api";
  const auth: any = useContext(AuthContextProvider);

  const passwordHandler = (event: any) => {
    setpassword(event.target.value);
  };
  const nameHandler = (event: any) => {
    setname(event.target.value);
  };
  const repeatPasswordHandler = (event: any) => {
    setrepeatPassword(event.target.value);
  };
  const phoneHandler = (event: any) => {
    setphone(event.target.value);
  };

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(backendUrl + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, password: password, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        auth.setisSignedIn(!auth.isSignedIn);
        auth.setUser(data["user_info"]);
        localStorage.setItem("user", JSON.stringify(data["user_info"]));
      } else if (response.status === 401) {
        console.log("error 401");
      } else if (response.status === 404) {
      } else if (response.status == 400) {
        // setnameError();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return !auth.isSignedIn ? (
    <div className="h-lvh w-lvw flex justify-center items-center">
      <Card>
        <div className="flex flex-col h-[500px] justify-center items-center ">
          <h1 className="mb-5 text-white">Register Account</h1>
          <form className="max-w-sm mx-auto" onSubmit={handleSignIn}>
            <div className="mb-2">
              <label
                htmlFor="username"
                // border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                Your username
              </label>
              <input
                type="text"
                id="username"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mayoorathan"
                required
                onChange={nameHandler}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="phonenumber"
                // border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                Your phone number
              </label>
              <input
                type="tel"
                id="phonenumber"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                onChange={phoneHandler}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                onChange={passwordHandler}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="repeat-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                style={password !== repeatPassword ? errorBoxStyle : undefined}
              >
                Repeat password
              </label>
              <input
                type="password"
                id="repeat-password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                onChange={repeatPasswordHandler}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            >
              Register new account
            </button>
            <div className="flex items-start mb-2">
              <p className="mt-1 text-center text-sm text-gray-500">
                Already have an account,
                <a
                  href="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <WebCamComp name={"karthee"} />
    </div>
  );
}
//  <Card>
//           <div className="flex flex-col h-[300px] justify-center ">

//           </div>
//         </Card>
const errorBoxStyle: React.CSSProperties = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#f8d7da",
  color: "#721c24",
  border: "1px solid #f5c6cb",
  borderRadius: "4px",
};
