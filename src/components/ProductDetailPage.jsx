import { Box, Button, Center, Divider, Flex, Heading,  Image, List, ListItem,  Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {  useLazyGetCategoriesQuery } from '../store/services/CategoriesService'
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../store/services/ProductsService'
import Sidebar from './Sidebar'
import { addProduct } from '../reducers/cart';
import { useDispatch } from 'react-redux';

export default function ProductDetailPage() {
    const { productId } = useParams()
    const { data: product } = useGetProductQuery(productId)
    const [getCategories, { data: subcategories }] = useLazyGetCategoriesQuery()
    const dispatch = useDispatch()
    const toast = useToast()
    useEffect(() => {
        if (product && product.categories && product.categories.parent) {
            getCategories({ parent: product.categories.parent })
        } else if (product && product.categories && !product.categories.parent) {
            getCategories({ parent: product.categories._id })
        }
    }, [product, getCategories])
    const add = () => {
        dispatch(addProduct({product, qty: 1}))
        toast({
            status: 'success',
            title: 'Товар добавлен в корзину',
            isClosable: true,
            duration: 2000
        })
    }

    return (<Flex>
        <Sidebar items={subcategories} />
        <Box p="4" pt={0} ml={2} w='100%'>
            <Heading mb={3}> {product?.title}</Heading>
            {product && <Flex>
                <VStack w='50%'>
                <Box w='100%'  p={2} mt={2} borderWidth={1} borderRadius='base'>
                    <List mt={3}>
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>ID товара</Text> <Text>{product.artikle}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Автор</Text> <Text>{product.author}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Издательство</Text> <Text>{product.production && product.production.name}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Год издания</Text> <Text>{product.year}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Кол-во страниц</Text> <Text>{product.pagesCount}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Формат</Text> <Text>{product.format}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Тип обложки</Text> <Text>{product.typeWrapper}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Вес, г</Text> <Text>{product.weigh}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Кол-во в наличи</Text> <Text>{product.quantity}</Text></ListItem><Divider p={1} mb={2} />
                        <ListItem display='flex'><Text fontWeight='bold' w='200px'>Возрастные ограничения</Text> <Text>{product.ageRestriction}</Text></ListItem><Divider p={1} mb={2} />
                    </List>

                </Box>
                    <Box w='100%' p={2} mt={2} borderWidth={1} borderRadius='base'>
                        <Text  fontWeight='bold'>Аннотация</Text>
                        <Text >{product.descripton}</Text>

                    </Box>
                    </VStack>
                <Box w='50%'>
                <Center>
                    <VStack spacing={2}>
                    {product.images && product.images.map(image => (<Image borderRadius='base' mb={3} key={image} src={image.replace('uploads\\', '/')} />))}
                    
                    <Box p={4} mt={2} borderWidth={1} borderRadius='base'>
                        <Heading mb={3} fontSize='2xl'>Цена: {Number(product.price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Heading>
                    <Button onClick={add} size='lg' colorScheme='pink'>Добавить в корзину</Button>
                    </Box>
                    </VStack>
                    </Center>
                </Box>
            </Flex>}

        </Box>
    </Flex>)
}