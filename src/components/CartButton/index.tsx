import { Badge, Button } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useAppSelector } from '../../store/config'
import { useNavigate } from 'react-router-dom'

function CartButton() {
  const { reserveList } = useAppSelector(state => state.reserve)
  const navigate = useNavigate()

  return (
    <Button
      size='sm'
      onClick={() => {
        navigate('/reservation')
      }}
      position='relative'
    >
      <StarIcon />
      <Badge colorScheme='red' position='absolute' top='0' right='0'>
        {reserveList.length}
      </Badge>
    </Button>
  )
}

export default CartButton
