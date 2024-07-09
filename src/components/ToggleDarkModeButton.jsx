import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ToggleDarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton 
      height={'30px'}   
      width={'2px'}
      aria-label="Toggle dark mode"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
};

export default ToggleDarkModeButton;
