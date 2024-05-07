import { Provider } from "react-redux";
import JobPage from './pages/JobPage'
import theme from "./Theme";
import './global.css'
import { ThemeProvider } from "@emotion/react";
import { store} from "./store";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <JobPage />
        </Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
