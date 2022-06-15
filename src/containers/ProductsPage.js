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
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
// import { useGetUsersQuery } from "../store/services/UserService";
import Sidebar from "../components/Sidebar";
import Product from "../components/Product";
import {useParams } from 'react-router-dom';
import {  useLazyGetProductsQuery } from "../store/services/ProductsService";
import { useGetCategoyQuery, useLazyGetCategoriesQuery } from "../store/services/CategoriesService";

export default function UsersPage() {
  const {categoryId} = useParams()
  const [getProducts, {data: products, isLoading}] = useLazyGetProductsQuery()
  const [getCategories, {data: subcategories}] = useLazyGetCategoriesQuery()

  const {data: category} = useGetCategoyQuery(categoryId)
  useEffect(() => {
    if (categoryId && category && category.parent) {
      console.log(category)
      getProducts({categories: categoryId})
      getCategories({parent: category.parent._id})
    } else if (categoryId && category && !category.parent) getProducts({categories: categoryId})
  }, [categoryId, category, getCategories])

  return (
    <Flex>
      {categoryId && category && !category.parent ? <div></div> : 
      <Sidebar items={subcategories} />}
      <Box p="4" pt={0} ml={2}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          {category && category.parent && 
          <BreadcrumbItem>
            <BreadcrumbLink href={"/categories/" + category.parent._id}>{category.parent.name}</BreadcrumbLink>
          </BreadcrumbItem>}
          {category && 
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={"/categories/" + category._id}>{category?.name}</BreadcrumbLink>
          </BreadcrumbItem>}
        </Breadcrumb>
        <Heading>{category?.name}</Heading>
        {isLoading || !products ? <Spinner /> : <div>
        <Text>
          Найдено <b>{products.length}</b> товар
        </Text>
        <Box bg="gray.100" mt={3} p={3} mb={3} borderRadius="md">
          <Flex alignItems="center">
            <Input type="search" onChange={ev => getProducts({title: ev.target.value, categories: categoryId})} bg="white" />
            <IconButton ml={2} icon={<SearchIcon />} />
          </Flex>
        </Box>
        <SimpleGrid columns={4} spacing={10}>
          {products && products.length ? products.map(p => (<Product product={p} key={p._id} />)) : <Text>Нет товаров</Text>}
        </SimpleGrid></div>}
        
      </Box>
    </Flex>
  );
}
