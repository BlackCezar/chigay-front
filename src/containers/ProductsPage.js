// import { useDisclosure } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
// import { useGetUsersQuery } from "../store/services/UserService";
import Sidebar from "../components/Sidebar";
import Product from "../components/Product";

export default function UsersPage() {
  //   const { data, isLoading } = useGetUsersQuery();
  //   const users = data && data.array ? data.array : [];
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <Sidebar />
      <Box p="4" pt={0} ml={2}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading>Образование</Heading>
        <Text>
          Найдено <b>39723</b>товара
        </Text>
        <Box bg="gray.100" mt={3} p={3} mb={3} borderRadius="md">
          <Flex alignItems="center">
            <Input type="search" bg="white" />
            <IconButton ml={2} icon={<SearchIcon />} />
          </Flex>
        </Box>
        <SimpleGrid columns={4} spacing={10}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
