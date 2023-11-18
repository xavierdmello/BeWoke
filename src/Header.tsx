
import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import bewokelogo from  './assets/bewokelogo.png';
const Header: React.FC = () => {
  return (
    <Box bg="black" py={4} textAlign="center">
      <Image src={bewokelogo} alt="Logo" mx="auto" height={"30px"} />
    </Box>
  );
};

export default Header;
