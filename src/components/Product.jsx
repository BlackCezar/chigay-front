import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addProduct } from "../reducers/cart";

export default function Sidebar({ product }) {
  const dispatch = useDispatch()
  const toast = useToast()

  const selectProduct = () => {
    dispatch(addProduct({ product, qty: 1 }))
    toast({
      title: 'Товар добавлен',
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <div className="sidebar">
      <Box borderWidth="1px" p={3} borderRadius="md">
        <Flex flexDirection="column">
          <NavLink to={`/products/${product._id}`}>
            <Image src={product.images && product.images.length ? product.images[0].src : ''} />
            <Text> {product.title}</Text></NavLink>
          <Text color='gray' fontSize="sm">{product.title}</Text>
          <Text mt={3} mb={3} textAlign='right' fontWeight="bold">{product.price ? product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) : 'Не указано'}</Text>
          <Button colorScheme="pink" onClick={selectProduct}>Купить</Button>
        </Flex>
      </Box>
    </div>
  );
}
