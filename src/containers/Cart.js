import { AddIcon, ArrowBackIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, FormControl, FormLabel, Heading, IconButton, Input, Table,  TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeProduct, setAddress, setCount, setPhone, clearCart } from '../reducers/cart'
import { useCreateOrderMutation, useSendMessageMutation } from '../store/services/OrderService'

export default function CartPage() {
    const products = useSelector(state => state.cart.products)
    const user = useSelector(state => state.user.object)
    const phone = useSelector(state => state.cart.phone)
    const address = useSelector(state => state.cart.address)
    const [rerender, setRerender] = React.useState(false)
    const [create, {isLoading, data: gotObj}] = useCreateOrderMutation()
    const [send] = useSendMessageMutation()
    
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const total = useMemo(() => {
        let sum = 0
        for (const pr of products) {
            sum += pr.qty * pr.product.price
        }
        return sum
    }, [products])

    const createOrder = async () => {
        const d = await create({
            phone,
            address,
            status: 'В ожидании',
            amount: parseInt(total),
            user: user ? user._id : null,
            products
        })
        await send(gotObj)
        dispatch(clearCart())
        navigation('/')
    }

    return <div><Box>
        <Heading>
            <IconButton onClick={() => navigation(-1)} icon={<ArrowBackIcon />} /> Корзина
        </Heading>
        <Box p={3} boxShadow='base' mt={3} borderWidth='1px' borderRadius='base'>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Товар</Th>
                            <Th>Кол-во</Th>
                            <Th>Цена</Th>
                            <Th>Сумма</Th>
                            <Th>Действие</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products && products.length ? products.map((p, i) => (<Tr key={p.product._id}>
                            <Td>{i + 1}</Td>
                            <Td>{p.product.title}</Td>
                            <Td>
                                <IconButton onClick={() => dispatch(setCount({_id: p.product._id, qty: p.qty - 1}))} disabled={p.qty < 2} icon={<MinusIcon />} /> 
                            {p.qty} 
                            <IconButton onClick={() => dispatch(setCount({_id: p.product._id, qty: p.qty + 1}))} disabled={p.product.quantity <= p.qty} icon={<AddIcon />} /> </Td>
                            <Td>{p.product.price ? p.product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) : ''}</Td>
                            <Td>{(p.qty * p.product.price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Td>
                            <Td><IconButton onClick={() => {dispatch(removeProduct(p.product._id)); console.log('!!'); setRerender(!rerender);}} icon={<DeleteIcon />} /></Td>
                        </Tr>)) : <></>}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
        <Box p={3} boxShadow='base' mt={3} borderWidth='1px' borderRadius='base'>
            <FormControl>
                <FormLabel htmlFor='phone'>Номер телефона</FormLabel>
                <Input type='tel' id="phone" value={phone} onChange={ev => dispatch(setPhone(ev.target.value))} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='address'>Адрес доставки</FormLabel>
                <Input id="address" value={address} onChange={ev => dispatch(setAddress(ev.target.value))} />
            </FormControl>
        </Box>
        <Box float='right' p={3} boxShadow='base' mt={3} borderWidth='1px' borderRadius='base'>
            <Text>Итого: <b>{total.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</b></Text>
            <Divider mt={3} mb={3} />
            <Button disabled={isLoading} ml='auto' size='lg' onClick={createOrder} colorScheme='pink'>Оформить</Button>
        </Box>
    </Box></div>
}
