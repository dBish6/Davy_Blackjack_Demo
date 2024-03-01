import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import blackjackTheme from "./styles/theme";

import store from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={blackjackTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
