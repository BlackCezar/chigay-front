import {  Box, Flex, Heading, IconButton, Image, List, ListItem,  Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import AdminProductCreateTab from "../components/admin/AdminProductCreateTab";
import { useGetProductsQuery, useLazyDeleteProductQuery, useUpdateProductMutation } from "../store/services/ProductsService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ModalAdminProduct from "../components/admin/ModalAdminProduct";

export default function AdminProducts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {data: products, refetch} = useGetProductsQuery()
  const [remove] = useLazyDeleteProductQuery()
  const [update] = useUpdateProductMutation()
  const [product, setProduct] = useState({
    title: "",
    author: "",
    artikle: "",
    year: 2022,
    pagesCount: 300,
    format: "",
    typeWrapper: "Мягкая бумажная",
    descripton: "",
    weigh: 300,
    ageRestriction: 12,
    price: 300,
    categories: [],
    production: "",
    quantity: 1,
  })
  return (
    <div>
      <Heading>Товары</Heading>

      <Box m={3}>
        <Tabs >
          <TabList>
            <Tab>Список</Tab>
            <Tab>Добавить</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Accordion>
                {products && products.length && products.map(p => ( <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {p.artikle} <b>{p.title}</b> 
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex>
                      <Box w='50%'>
                        <List>
                          <ListItem display='flex'><Text fontWeight='bold' w='200px'>ID товара</Text> <Text>{p.artikle}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Автор</Text> <Text>{p.author}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Издательство</Text> <Text>{p.production && p.production.name}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Цена</Text> <Text>{p.price}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Год издания</Text> <Text>{p.year}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Кол-во страниц</Text> <Text>{p.pagesCount}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Формат</Text> <Text>{p.format}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Тип обложки</Text> <Text>{p.typeWrapper}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Вес, г</Text> <Text>{p.weigh}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Кол-во в наличи</Text> <Text>{p.quantity}</Text></ListItem>
                          <ListItem  display='flex'><Text fontWeight='bold' w='200px'>Возрастные ограничения</Text> <Text>{p.ageRestriction}</Text></ListItem>
                        </List>
                      </Box>
                      <Box w='50%'>
                        {p.images ? p.images.map(i => (<Image src={i} />)) : <Text>Нет изображений</Text>}
                      </Box>
                    </Flex>
                    <Flex justifyContent='flex-end'>
                      <IconButton icon={<DeleteIcon />} onClick={(() => {remove(p._id);refetch()})} mr={3} colorScheme='red' />
                      <IconButton icon={<EditIcon />} onClick={() => {
                          setProduct(p);
                          onOpen();
                        }} colorScheme='pink' />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>))}
               
              </Accordion>
            </TabPanel>
            <TabPanel>
              <AdminProductCreateTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <ModalAdminProduct onClose={onClose} isOpen={isOpen} onOpen={onOpen} object={product} action={update} setObject={setProduct} />
    </div>
  );
}