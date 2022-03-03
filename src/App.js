import Routes from "./Routes/appRoutes";
import { store } from "./Redux";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
