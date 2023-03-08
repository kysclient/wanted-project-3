import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

const links = {
  github: 'https://github.com/wanted-9th-3team/pre-onboarding-9th-2-3',
}

function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'skyblue')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>
          <a href={links.github}>
            © 2023 wanted-9th-3team. All rights reserved
          </a>
        </Text>
      </Container>
    </Box>
  )
}

export default Footer
