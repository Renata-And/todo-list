import type {RootState} from './store';
import type {ThemeMode} from './app-reducer';

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode