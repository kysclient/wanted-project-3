import Default from '../layout/Default'
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/config'
import ProductItem from '../components/ProductItem'
import Info from '../modules/InfoScreen'
import { setReserve } from '../store/slices/reserveSlice'

function ReservePage() {
  const { reserveList } = useAppSelector(state => state.reserve)
  const dispatch = useAppDispatch()

  const getTotalPrice = () => {
    let total = 0
    reserveList.map(product => {
      total += product.price * product.quantity
    })
    return total
  }

  const deleteAll = () => {
    dispatch(setReserve([]))
  }

  return (
    <Default>
      <Container maxW='container.xl'>
        <Text fontSize={'4xl'} mb='2'>
          {' '}
          장바구니💕
        </Text>
        <Box fontSize='2xl' color={useColorModeValue('gray.800', 'white')}>
          총 금액:
          <Box as='span' color={'gray.600'} fontSize='lg' ml='10px'>
            ₩
          </Box>
          {getTotalPrice()}
        </Box>
        <Button
          mr='2'
          bg={useColorModeValue('#151f21', 'gray.900')}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          onClick={deleteAll}
        >
          전체 삭제
        </Button>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing='20px'
          pt='10'
          style={{ justifyItems: 'center' }}
        >
          {reserveList.length > 0 ? (
            [...new Set(reserveList)].map((product, idx) => (
              <ProductItem
                key={idx}
                price={product.price}
                idx={product.idx}
                description={product.description}
                name={product.name}
                mainImage={product.mainImage}
                spaceCategory={product.spaceCategory}
                maximumPurchases={product.maximumPurchases}
                registrationDate={product.registrationDate}
                isCart={true}
                quantity={product.quantity}
              />
            ))
          ) : (
            <Info info={'장바구니에 담긴 상품이 없어요.'} />
          )}
        </SimpleGrid>
      </Container>
    </Default>
  )
}

export default ReservePage
