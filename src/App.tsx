import { useEffect, useState, useRef, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { Button, Input, Heading, Flex } from "@chakra-ui/react";
import TakeBeWoke from "./TakeBeWoke";
import Header from "./Header";
import SetAlarm from "./SetAlarm"
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
    const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
    const [result, setResult] = useState<string>("");
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [task, setTask] = useState<string>("");
    const [menu, setMenu] = useState<string>("setalarm");
    const [alarmTime, setAlarmTime] = useState<string>("");

  return <Flex flexDirection={"column"} backgroundColor={"black"} height={"100vh"} mx="auto" alignItems={"center"} maxWidth={"700px"} width={"100%"} borderX={"1px solid gray "}>
    <Header/>
      {menu == "takebewoke" && <TakeBeWoke base64={base64} setBase64={setBase64} result={result} setResult={setResult} capturedImage={capturedImage} setCapturedImage={setCapturedImage} task={task} setTask={setTask}/>}
      {menu == "setalarm" && <SetAlarm task={task} setTask={setTask} alarmTime={alarmTime} setAlarmTime={setAlarmTime}/>}
  </Flex>;
}

export default App;
