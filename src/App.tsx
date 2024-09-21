import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../src/App.css";
import Webcam from "react-webcam";
import WebCamComp from "./components/Webcam";
import { Button, Card } from "./components/Card";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import { AuthContextProvider } from "./Providers/AuthProviders";
import Profile from "./components/Profile";
const cursorStyle = {
  height: 60,
  width: 3,
  display: "inline-block",
  backgroundColor: "black",
  marginLeft: 4,
  marginTop: -4,
  transition: "opacity 0.5s ease",
};

const textStyle = {
  fontFamily: "Computer Modern, serif",
  fontSize: 50,
};

const containerStyle = {
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
};

const App = () => {
  const [frame, setFrame] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const text = "Fashion AI Project";
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setShowComponent(true);
      } else {
        setShowComponent(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => prevFrame + 1);
    }, 33); // roughly 30 frames per second
    return () => clearInterval(interval);
  }, []);

  const charsShown = Math.floor(frame / 3);
  const textToShow = text.slice(0, charsShown);
  const cursorShown =
    textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

  return showComponent ? (
    <div
      className={`fadeLift ${!showComponent ? "hidden" : ""}`}
      style={containerStyle}
    >
      <div style={textStyle}>
        <button onClick={() => setShowComponent(!showComponent)}>
          {textToShow}
        </button>
        <span
          style={{
            ...cursorStyle,
            opacity: cursorShown ? 1 : 0,
          }}
        />
      </div>
    </div>
  ) : (
    <Apps />
  );
};

interface TypewriterEffectProps {
  text: string; // Text to be animated
  speed?: number; // Speed of typing effect in milliseconds
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 100,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};
export function Apps() {
  const [webCamData, setWebCamData] = useState("");
  const [textInputValue, setTextInputValue] = useState("");
  const [isName, setIsName] = useState(false);
  const backendUrl = "http://127.0.0.1:5000/api";
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState<string>("");
  const [skinTone, setskinTone] = useState("");
  const [redirect, setredirect] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const navigate = useNavigate();

  const auth: any = useContext(AuthContextProvider);

  useEffect(() => {
    if (JSON.stringify(auth.user) === JSON.stringify({})) {
      console.log(auth.user);
    } else {
      localStorage.setItem("user", JSON.stringify(auth.user));
      change();
    }
  }, [auth.user]);

  useEffect(() => {
    if (redirect) {
      console.log(userName, userGender);
      const someProps = {
        name: userName,
        gender: userGender.toLowerCase(),
        faceTone: skinTone,
      };
      navigate("/profile", { state: someProps });
    }
  }, [redirect]);

  const change = async () => {
    try {
      const response = await fetch(backendUrl + "/name_verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: auth.user["name"] }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data[0];
        setUserName(user["name"]);
        setUserGender(user["gender"]);
        setskinTone(user["facetone"]);
        setredirect(!redirect);

        // handleRedirect();
      } else {
        setIsName(!isName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      {!auth.user ? <div>you are here</div> : Login()}
    </div>
    // </div>
  );
}

const TextInput = ({ textInputValue, setTextInputValue }: any) => {
  const handleInputChange = (event: any) => {
    setTextInputValue(event.target.value);
  };
  return (
    <div className="flex">
      {/* <span className="inline-flex items-center px-3 text-sm text-white bg-white border   rounded-e-0 border-e-0 rounded-s-md dark:bg-white dark:text-white dark:border-black">
        <svg
          className="w-4 h-4 text-blue-500 dark:text-blue-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      </span> */}
      <input
        type="text"
        id="website-admin"
        value={textInputValue}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="Mayoorathan"
      />
    </div>
  );
};

// React.ChangeEvent<HTMLInputElement>;
const FileUpload = (handleFileChange: any) => {
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
export { FileUpload };

export default App;
