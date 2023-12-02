import 'vuetify/styles';
import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import colors from 'vuetify/lib/util/colors';

const customThemeColors: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#242424',
    'background-lighten': colors.grey.darken3,
    'text-color': colors.shades.white,
    primary: colors.orange.darken1,
    secondary: colors.orange.lighten5,
    'loss': colors.red.lighten1,
    'gain': colors.green.lighten1
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'customThemeColors',
    themes: {
      customThemeColors
    }
  }
});

export default vuetify;