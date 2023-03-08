import {
  Flex,
  Box,
  Image,
  Badge,
  Text,
  useColorModeValue,
  useDisclosure,
  Button,
  useToast,
} from '@chakra-ui/react'
import ProductDetail from '../ProductDetail'
import { dateConverter } from '../../utils/dateConverter'
import React from 'react'
import {
  setDeleteReserveItem,
  setReserveItemDecreasePrice,
  setReserveItemIncreasePrice,
} from '../../store/slices/reserveSlice'
import { useAppDispatch } from '../../store/config'

interface IProductItemProps {
  idx: number
  name: string
  mainImage: string
  description: string
  spaceCategory: string
  price: number
  maximumPurchases: number
  registrationDate: string
  isCart: boolean
  quantity: number
}

function ProductItem(product: IProductItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useAppDispatch()
  const toast = useToast()

  const increase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.quantity > product.maximumPurchases) {
      toast({
        title: '최대 구매 횟수를 초과하셨습니다.',
        description: product.name,
        status: 'warning',
        position: 'top',
        isClosable: true,
      })
      return
    }
    dispatch(setReserveItemIncreasePrice(product.idx))
  }

  const decrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.quantity - 1 === 0) {
      return
    }
    dispatch(setReserveItemDecreasePrice(product.idx))
  }

  const deleteOne = () => {
    dispatch(setDeleteReserveItem(product.idx))
  }

  return (
    <>
      <Flex>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          width='320px'
          borderWidth='1px'
          rounded='lg'
          shadow='lg'
          position='relative'
          style={{ cursor: 'pointer', transition: '.3s' }}
          onClick={onOpen}
          _hover={{ transform: 'translate(0px, -15px)' }}
        >
          <Image
            src={product.mainImage}
            alt={product.description}
            roundedTop='lg'
            sx={{ width: '320px' }}
          />

          <Box p='6'>
            <Box sx={{ display: 'flex' }} alignItems='baseline'>
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
                {product.spaceCategory}
              </Badge>
            </Box>
            <Flex mt='1' justifyContent='space-between' alignContent='center'>
              <Box
                fontSize='2xl'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
              >
                {product.name}
              </Box>
            </Flex>

            <Flex justifyContent='space-between' alignContent='center'>
              <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {dateConverter(product.registrationDate)}
              </Box>
              <Box
                fontSize='2xl'
                color={useColorModeValue('gray.800', 'white')}
              >
                <Box as='span' color={'gray.600'} fontSize='lg'>
                  ₩
                </Box>
                {product.price}
              </Box>
            </Flex>
            {product.isCart && (
              <Flex justify='center' align='center'>
                <Button
                  w='container.sm'
                  mr='2'
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  disabled={product.quantity === 1}
                  onClick={e => {
                    decrease(e)
                  }}
                >
                  -
                </Button>

                <Text fontSize='3xl' m='2'>
                  {product.quantity}
                </Text>

                <Button
                  w='container.sm'
                  mr='2'
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  onClick={e => {
                    increase(e)
                  }}
                  m='2'
                >
                  +
                </Button>

                <Button
                  w='full'
                  bg='red.500'
                  color='white'
                  _hover={{
                    color: 'red',
                    bg: 'white',
                    border: '1px solid red',
                  }}
                  m='2'
                  onClick={() => {
                    deleteOne()
                  }}
                >
                  삭제
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Flex>

      <ProductDetail
        isOpen={isOpen}
        onClose={onClose}
        idx={product.idx}
        name={product.name}
        mainImage={product.mainImage}
        description={product.description}
        spaceCategory={product.spaceCategory}
        price={product.price}
        maximumPurchases={product.maximumPurchases}
        registrationDate={product.registrationDate}
      />
    </>
  )
}

export default ProductItem
