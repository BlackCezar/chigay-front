import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Box borderWidth="1px" p={3} borderRadius="md">
        <Flex flexDirection="column">
          <Image />
          <Text>Война миров</Text>
          <Text fontSize="sm">Война миров</Text>
          <Text fontWeight="bold">1334 р.</Text>
          <Button colorScheme="pink">Купить</Button>
        </Flex>
      </Box>
    </div>
  );
}
