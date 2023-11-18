import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// const imageData = await fs.readFile("./hotdog.jpg");
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

  useEffect(() => {
    async function runEffect() {
      if (base64) {
        if (await isBase64UrlImage(base64.toString())) {
  
      
          console.log("Creating message")
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
          
          console.log("Message created")

          console.log("Making API call")
          const res = await chat.invoke([message]);
          setResult(res.content.toString());
          console.log("Api call done")
        } else {
          console.error("Not an image")
        }
      } else{
        console.error("No base64")
      }
      
    }

    runEffect();
  }, [base64]);

  return (
    <div>
      <input type="file" accept="image/png" onChange={handleFileChange} />

      <h1>{result}</h1>
      {base64 && <img src={base64.toString()} alt="Converted to Base64" />}
    </div>
  );
}

export default App;
