// *Design Imports*
import { Flex, Heading, Divider } from "@chakra-ui/react";

const MyHeading = (props) => {
  return (
    <Flex justifyContent="center">
      <Heading
        fontSize={props.fontSize}
        lineHeight="1.2"
        textAlign="center"
        {...props}
      >
        {props.text}
        <Divider
          border="1px solid wMain"
          mt="2px"
          w="70%"
          position="relative"
          left="15%"
        />
      </Heading>
    </Flex>
  );
};

export default MyHeading;
