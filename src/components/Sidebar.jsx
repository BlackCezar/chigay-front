import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Link } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Box borderWidth="1px" p={3} borderRadius="md">
        <Link href="/">
          <ArrowBackIcon /> Назад
        </Link>
        <Flex flexDirection="column">
          <Divider />
          <Link p={1} href="#">
            Образование
          </Link>
          <Link p={1} href="#">
            Образование
          </Link>
          <Link p={1} href="#">
            Образование
          </Link>
          <Link p={1} href="#">
            Образование
          </Link>
          <Link p={1} href="#">
            Образование
          </Link>
          <Link p={1} href="#">
            Образование
          </Link>
        </Flex>
      </Box>
    </div>
  );
}
