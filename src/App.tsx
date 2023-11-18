import { useEffect, useState, useRef, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { Button } from "@chakra-ui/react";

import Webcam from "react-webcam";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const chat = new ChatOpenAI({
  modelName: "gpt-4-vision-preview",
  maxTokens: 1024,
  openAIApiKey: OPENAI_API_KEY,
});

async function isBase64UrlImage(base64String: string) {
  let image = new Image();
  image.src = base64String;
  return await new Promise((resolve) => {
    image.onload = function () {
      if (image.height === 0 || image.width === 0) {
        resolve(false);
        return;
      }
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
}

function App() {
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
  const [result, setResult] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const webcamRef = useRef<Webcam>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const videoConstraints = {
    width: 480,
    height: 640,
    facingMode: facingMode,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    // Do something with the imageSrc
  }, [webcamRef]);

  useEffect(() => {
    async function runEffect() {
      if (base64) {
        if (await isBase64UrlImage(base64.toString())) {
          console.log("Creating message");
          const message = new HumanMessage({
            content: [
              {
                type: "text",
                text: "What's in this image?",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64.toString().split(",")[1]}`,
                },
              },
            ],
          });

          const res = await chat.invoke([message]);
          setResult(res.content.toString());
        } else {
          console.error("Not an image");
        }
      } else {
        console.error("No base64");
      }
    }

    runEffect();
  }, [base64]);

  return (
    <div>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      <h1>{result}</h1>
      <Button onClick={capture}>Capture photo</Button>
      <Button onClick={() => setFacingMode((prevState) => (prevState === "user" ? "environment" : "user"))}>Switch Camera</Button>
      <Webcam audio={false} height={640} ref={webcamRef} screenshotFormat="image/jpeg" width={480} videoConstraints={videoConstraints} />
    </div>
  );
}

export default App;
