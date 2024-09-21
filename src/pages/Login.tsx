import { useContext, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { AuthContextProvider } from "../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const auth: any = useContext(AuthContextProvider);
  const backendUrl = "http://127.0.0.1:5000/api";
  const [isname, setisname] = useState(false);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [nameError, setnameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event: any) => {
    setpassword(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setname(event.target.value);
  };

  const handleBackend = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(backendUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("data is ", data["user_info"]);
        auth.setIsLoggedIn(!auth.isLoggedIn);
        auth.setUser(data["user_info"]);
        console.log("current user in auth is ", auth.user);
      } else if (response.status === 401) {
        setpasswordError(data["error"]);
      } else if (response.status === 404) {
        navigate("/signup");
      } else if (response.status === 400) {
        // setnameError();
      } else {
        // setIsName(!isName);
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-lvh w-lvw flex justify-center items-center">
      <Card>
        <div className="flex flex-col h-[500px] justify-center items-center ">
          <h1 className="mb-5 text-white">Login Account</h1>
          <form className="max-w-sm mx-auto" onSubmit={handleBackend}>
            <div className="mb-2">
              <label
                htmlFor="Name"
                // border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mayoorathan"
                required
                onChange={handleUsernameChange}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                style={passwordError ? errorBoxStyle : undefined}
              >
                {passwordError ? passwordError : "Your password"}
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                onChange={handlePasswordChange}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 w-[100%]"
              // onSubmit={handleBackend}
            >
              Login
            </button>
            <div className="flex items-start mb-2">
              <p className="mt-1 text-center text-sm text-gray-500">
                Not have an account,
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  Signup
                </a>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
    // <form className="max-w-sm mx-auto">
    //   <div className="mb-5">
    //     <label
    //       htmlFor="username-success"
    //       className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
    //     >
    //       Your name
    //     </label>
    //     <input
    //       type="text"
    //       id="username-success"
    //       className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
    //       placeholder="Bonnie Green"
    //     />
    //     <p className="mt-2 text-sm text-green-600 dark:text-green-500">
    //       <span className="font-medium">Alright!</span> Username available!
    //     </p>
    //   </div>
    //   <div>
    //     <label
    //       htmlFor="username-error"
    //       className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
    //     >
    //       Your name
    //     </label>
    //     <input
    //       type="text"
    //       id="username-error"
    //       className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
    //       placeholder="Bonnie Green"
    //     />
    //     <p className="mt-2 text-sm text-red-600 dark:text-red-500">
    //       <span className="font-medium">Oops!</span> Username already taken!
    //     </p>
    //   </div>
    // </form>
  );
}

// Example inline CSS for the error box
const errorBoxStyle: React.CSSProperties = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#f8d7da",
  color: "#721c24",
  border: "1px solid #f5c6cb",
  borderRadius: "4px",
};
