import Default from '../layout/Default'
import { useAppSelector } from '../store/config'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import Loading from '../modules/Loading'
import ProductItem from '../components/ProductItem'
import React from 'react'
import { Product } from '../store/slices/productSlice'
import Info from '../modules/InfoScreen'

function MainPage() {
  const [loading, setLoading] = useState(true)
  const { productList } = useAppSelector(state => state.product)
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [startMoneyFilter, setStartMoneyFilter] = useState<number>()
  const [endMoneyFilter, setEndMoneyFilter] = useState<number>()
  const toast = useToast()

  useEffect(() => {
    setTimeout(() => setLoading(false), 300)
  }, [])

  const categoryList = ['서울', '강원', '부산', '대구', '제주']

  const handleCategoryOnChange = (e: string[] | string) => {
    setCategoryFilter([...e])
  }
  const handleStartMoneyOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (endMoneyFilter && parseInt(e.target.value) > endMoneyFilter) {
      toast({
        title: '최소금액은 최대금액을 넘을 수 없습니다.',
        status: 'info',
        isClosable: true,
        position: 'top',
      })
      return
    }
    setStartMoneyFilter(parseInt(e.target.value))
  }

  const handleEndMoneyOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndMoneyFilter(parseInt(e.target.value))
  }

  const clearAllCategories = () => {
    setCategoryFilter([])
  }

  const filter = (productList: Product[]): Product[] => {
    const filterWithCategories =
      categoryFilter.length > 0
        ? productList.filter(product => {
            const find = categoryFilter.find(
              category => category === product.spaceCategory
            )
            if (find !== undefined) {
              return product
            }
          })
        : productList

    const filterWithStartPrice = filterWithCategories.filter(product => {
      if (startMoneyFilter) {
        if (startMoneyFilter <= product.price) return product
      } else {
        return product
      }
    })

    const filterWithEndPrice = filterWithStartPrice.filter(product => {
      if (endMoneyFilter) {
        if (endMoneyFilter >= product.price) return product
      } else {
        return product
      }
    })

    return filterWithEndPrice
  }

  return (
    <Default>
      <Container maxW='container.xl'>
        <Text fontSize={'4xl'} mb='2'>
          {' '}
          방방곡곡의 여행 콘텐츠🔥
        </Text>

        <Box display='flex'>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              mr='2'
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              지역 선택
            </MenuButton>
            <MenuList minWidth='240px'>
              <MenuOptionGroup
                title='지역'
                type='checkbox'
                value={categoryFilter}
                onChange={handleCategoryOnChange}
              >
                {categoryList.map((category, idx) => (
                  <MenuItemOption key={idx} value={category}>
                    {category}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
              <MenuItemOption onClick={clearAllCategories}>
                초기화
              </MenuItemOption>
            </MenuList>
          </Menu>

          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='1.2em'
            >
              ₩
            </InputLeftElement>
            <Input
              placeholder='최소금액을 입력해 주세요.'
              variant='flushed'
              focusBorderColor={'151f21'}
              type='number'
              value={startMoneyFilter}
              mr='2'
              onChange={handleStartMoneyOnChange}
            />
            <Input
              placeholder='최대금액을 입력해 주세요.'
              variant='flushed'
              focusBorderColor={'151f21'}
              type={'number'}
              onChange={handleEndMoneyOnChange}
            />
          </InputGroup>
        </Box>

        {loading ? (
          <Loading />
        ) : (
          <SimpleGrid
            columns={[1, 2, 3]}
            spacing='30px'
            pt='10'
            style={{ justifyItems: 'center' }}
          >
            {productList && filter(productList).length > 0 ? (
              filter(productList).map((product, idx) => (
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
                  isCart={false}
                  quantity={product.quantity}
                />
              ))
            ) : (
              <Info info={'이런! 조건과 일치하는 상품이 없어요.'} />
            )}
          </SimpleGrid>
        )}
      </Container>
    </Default>
  )
}

export default MainPage
