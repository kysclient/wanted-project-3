import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  useColorModeValue,
  Heading,
  Box,
  Text,
  Badge,
  useToast,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../store/config'
import { useCallback } from 'react'
import { setReserve } from '../../store/slices/reserveSlice'
import { dateConverter } from '../../utils/dateConverter'

interface IProductDetailProp {
  isOpen: boolean
  onClose: () => void
  idx: number
  name: string
  mainImage: string
  description: string
  spaceCategory: string
  price: number
  maximumPurchases: number
  registrationDate: string
}

function ProductDetail({
  isOpen,
  onClose,
  idx,
  name,
  mainImage,
  description,
  spaceCategory,
  maximumPurchases,
  registrationDate,
  price,
}: IProductDetailProp) {
  const toast = useToast()
  const { productList } = useAppSelector(state => state.product)
  const { reserveList } = useAppSelector(state => state.reserve)
  const dispatch = useAppDispatch()

  const addCart = useCallback(() => {
    onClose()
    if (reserveList.find(item => item.idx === idx)) {
      toast({
        title: '이미 장바구니에 존재하는 상품입니다.',
        description: name,
        status: 'info',
        position: 'top',
        isClosable: true,
      })
      return
    }
    const newItem = productList.find(item => item.idx === idx)
    if (newItem !== undefined) {
      const newItemList = [...reserveList, newItem]
      dispatch(setReserve(newItemList))
    }

    toast({
      title: '상단의 별모양을 클릭해 장바구니를 확인해보세요 !',
      description: name,
      status: 'success',
      position: 'top',
      isClosable: true,
    })
  }, [dispatch, reserveList, productList])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Heading as='h1'>{name}💕</Heading>
          <Box
            marginTop={{ base: '1', sm: '5' }}
            display='flex'
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent='space-between'
          >
            <Box
              display='flex'
              flex='1'
              marginRight='3'
              position='relative'
              alignItems='center'
            >
              <Box
                width={{ base: '100%', sm: '85%' }}
                zIndex='2'
                marginLeft={{ base: '0', sm: '22%' }}
                marginTop='5%'
              >
                <Image
                  borderRadius='lg'
                  src={mainImage}
                  alt='some good alt text'
                  objectFit='contain'
                />
              </Box>
              <Box zIndex='1' width='100%' position='absolute' height='100%'>
                <Box
                  bgGradient={useColorModeValue(
                    'radial(orange.600 1px, transparent 1px)',
                    'radial(orange.300 1px, transparent 1px)'
                  )}
                  backgroundSize='20px 20px'
                  opacity='0.4'
                  height='100%'
                />
              </Box>
            </Box>

            <Box
              display='flex'
              flex='1'
              flexDirection='column'
              marginTop={{ base: '3', sm: '0' }}
            >
              <Box sx={{ display: 'flex' }} alignItems='baseline'>
                <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
                  {spaceCategory}
                </Badge>
              </Box>
              <Heading marginTop='1'>
                <Box as='span' color={'gray.600'}>
                  ₩
                </Box>
                {price}
              </Heading>
              <Text
                as='p'
                marginTop='2'
                color={useColorModeValue('gray.700', 'gray.200')}
                fontSize='lg'
              >
                {description}
              </Text>

              <Text
                as='p'
                marginTop='2'
                color={useColorModeValue('gray.700', 'gray.200')}
                fontSize='md'
              >
                {dateConverter(registrationDate)}
              </Text>

              <Text
                as='p'
                marginTop='2'
                color={useColorModeValue('gray.700', 'gray.200')}
                fontSize='md'
              >
                최대이용횟수: {maximumPurchases}회
              </Text>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            닫기
          </Button>
          <Button
            px={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={addCart}
          >
            장바구니 담기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProductDetail
