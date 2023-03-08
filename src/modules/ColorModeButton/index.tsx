import { Button, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button size='sm' onClick={toggleColorMode}>
      {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export default ColorModeButton
