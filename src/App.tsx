import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

async function chat(input: string) {
  const promptTemplate = `Be very funny when answering questions.

  Question: ${input}`;
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${promptTemplate}` }],
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  return chatCompletion;
}

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    chat("What's the capital of france?").then((res) => {
      setMessage(res.choices[0].message.content!);
    });

  }, []);

  return (
    <>
      <h1>{message}</h1>  
    </>
  );
}

export default App;
