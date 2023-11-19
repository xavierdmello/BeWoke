import { Flex, Heading, Image, Input, SimpleGrid, Text } from "@chakra-ui/react";

import React from "react";

interface SetAlarmProps {
  task: string;
  setTask: (task: string) => void;
  alarmTime: string;
  setAlarmTime: (time: string) => void;
  result: string;
}

const SetAlarm: React.FC<SetAlarmProps> = ({ task, setTask, alarmTime, setAlarmTime, result }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontSize="2xl" color="white" mt="10px">
        In the morning, I will:
      </Heading>
      <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Morning Task" color="white" mt="10px" mb="10px" />

      <Heading fontSize="2xl" color="white" mt="10px">
        Alarm Time
      </Heading>
      <Input value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)} placeholder="Alarm Time" color="white" mt="10px" mb="10px" />
      <Text>{result}</Text>
      {!result && 
      <SimpleGrid columns={1} spacing={4} mt="10px">
      {/* Replace the following Image components with your actual images */}
      <Text fontSize="2xl" color="white">Take a photo to see your friends waking up!</Text>

      <Image src="https://img.freepik.com/free-vector/clear-blurred-background_1034-587.jpg" alt="Image 1" objectFit="cover" borderRadius="md" />
      <Image src="https://img.freepik.com/free-vector/clear-blurred-background_1034-587.jpg" alt="Image 2" objectFit="cover" borderRadius="md" />
      {/* Add more Image components as needed */}
    </SimpleGrid>}
      {result &&
      <SimpleGrid columns={1} spacing={4} mt="10px">
        {/* Replace the following Image components with your actual images */}
        <Text fontSize="2xl" color="white">Here are your friends waking up!</Text>
        <Image src="https://www.pedestrian.tv/wp-content/uploads/2022/08/15/Image-from-iOS-5-e1660543786465.jpg?quality=75" alt="Image 1" objectFit="cover" borderRadius="md" />
        <Image src="https://josiegirlblog.com/wp-content/uploads/2022/08/Screen-Shot-2022-08-15-at-11.48.49-AM-614x1024.jpg" alt="Image 2" objectFit="cover" borderRadius="md" />
        {/* Add more Image components as needed */}
      </SimpleGrid>}
    </Flex>
  );
};

export default SetAlarm;
