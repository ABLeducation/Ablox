import { COLOR_THEME } from './constants/colors';
import type { BlocklyThemeOptions } from 'blockly';

export const theme: BlocklyThemeOptions = {
  blockStyles: {
    logic_blocks: {
      colourPrimary: #00FFFF,
      colourSecondary: COLOR_THEME.CONTROL,
      colourTertiary: COLOR_THEME.CONTROL,
      hat: '',
    },
    loop_blocks: {
      colourPrimary: #00A36C,
      colourSecondary: COLOR_THEME.CONTROL,
      colourTertiary: COLOR_THEME.CONTROL,
      hat: '',
    },
    procedure_blocks: {
      colourPrimary: #FFBF00,
      colourSecondary: COLOR_THEME.CONTROL,
      colourTertiary: COLOR_THEME.CONTROL,
      hat: '',
    },
    math_blocks: {
      colourPrimary: 	#DE3163,
      colourSecondary: COLOR_THEME.VALUES,
      colourTertiary: COLOR_THEME.VALUES,
      hat: '',
    },
    text_blocks: {
      colourPrimary: #5D3FD3,
      colourSecondary: COLOR_THEME.VALUES,
      colourTertiary: COLOR_THEME.VALUES,
      hat: '',
    },
    colour_blocks: {
      colourPrimary: #FAFA33,
      colourSecondary: COLOR_THEME.VALUES,
      colourTertiary: COLOR_THEME.VALUES,
      hat: '',
    },
    variable_blocks: {
      colourPrimary: #93C572,
      colourSecondary: COLOR_THEME.DATA,
      colourTertiary: COLOR_THEME.DATA,
      hat: '',
    },
    list_blocks: {
      colourPrimary: #FFFF00,
      colourSecondary: COLOR_THEME.DATA,
      colourTertiary: COLOR_THEME.DATA,
      hat: '',
    },
  },
};
