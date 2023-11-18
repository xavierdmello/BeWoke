import React from "react";
import { Box, Image, Flex, Input, Heading } from "@chakra-ui/react";


interface SetAlarmProps {
    task: string;
    setTask: (task: string) => void;
}

interface SetAlarmProps {
    task: string;
    setTask: (task: string) => void;
    alarmTime: string;
    setAlarmTime: (time: string) => void;
}

const SetAlarm: React.FC<SetAlarmProps> = ({ task, setTask, alarmTime, setAlarmTime }) => {
    return (
      <Flex flexDirection="column" alignItems="center">
        <Heading fontSize="2xl" color="white" mt="10px">
          In the morning, I will:
        </Heading>
        <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Morning Task" color="white"  mt="10px" mb="10px" />

        <Heading fontSize="2xl" color="white" mt="10px">
          Alarm Time
        </Heading>
        <Input value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)} placeholder="Alarm Time" color="white" mt="10px" mb="10px" />
      </Flex>
    );
};

export default SetAlarm;

