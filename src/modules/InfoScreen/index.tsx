import { Box, Heading } from '@chakra-ui/react'

interface IInfoProps {
  info: string
}

export default function Info({ info }: IInfoProps) {
  return (
    <Box>
      <Heading as='h2' size='xl' mt={6} mb={2}>
        {info}
      </Heading>
    </Box>
  )
}
