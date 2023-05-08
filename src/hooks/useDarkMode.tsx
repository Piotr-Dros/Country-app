import { useContext } from 'react';
import {
  DarkModeContext,
  DarkModeContextType,
} from '../context/DarkModeContext';

function useDarkMode() {
  return useContext(DarkModeContext) as DarkModeContextType;
}

export default useDarkMode;
