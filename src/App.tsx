import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import TakeBeWoke from "./TakeBeWoke";
import Header from "./Header";
import SetAlarm from "./SetAlarm";
import alarm from "./assets/alarm.mp3"


function App() {
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
  const [result, setResult] = useState<string>("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [task, setTask] = useState<string>("");
  const [menu, setMenu] = useState<string>("setalarm");
  const [alarmTime, setAlarmTime] = useState<string>("");
  const [alarmSet, setAlarmSet] = useState<boolean>(false);
  const [audio] = useState(new Audio(alarm));

  useEffect(() => {
    alarmSet ? audio.play() : audio.pause();
  }, [alarmSet]);

  useEffect(() => {
    audio.addEventListener("ended", () => setAlarmSet(false));
    return () => {
      audio.removeEventListener("ended", () => setAlarmSet(false));
    };
  }, []);

  useEffect(() => {
    if (alarmSet) {
      audio.volume = 1;
    } else {
      audio.volume = 0;
    }
  }, [alarmSet])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const alarmHour = parseInt(alarmTime.split(":")[0]);
      const alarmMinutes = parseInt(alarmTime.split(":")[1]);

      if (currentMinutes === alarmMinutes && result !== "yes" && result !== "Yes" && result !== "yes." && result !== "Yes.") {
        setAlarmSet(true);
        setMenu("takebewoke");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [alarmTime, result ]);



  useEffect(() => {
    if (result.toLocaleLowerCase() === "yes" || result.toLocaleLowerCase() === "yes.") {
        setAlarmSet(false);
        setMenu("setalarm");
    } else if (result.toLocaleLowerCase() === "no" || result.toLocaleLowerCase() === "no.") {
        setAlarmSet(true);
        setMenu("takebewoke");
    }
  }, [result])
  
  return (
    <Flex
      flexDirection={"column"}
      backgroundColor={"black"}
      height={"100vh"}
      mx="auto"
      alignItems={"center"}
      maxWidth={"700px"}
      width={"100%"}
      borderX={"1px solid gray "}
    >
      <Header />
      {menu === "takebewoke" && (
        <TakeBeWoke
          base64={base64}
          setBase64={setBase64}
          result={result}
          setResult={setResult}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          task={task}
          setTask={setTask}
        />
      )}
      {menu === "setalarm" && (
        <SetAlarm
          task={task}
          setTask={setTask}
          alarmTime={alarmTime}
          setAlarmTime={setAlarmTime}
        />
      )}
    </Flex>
  );
}

export default App;

  

