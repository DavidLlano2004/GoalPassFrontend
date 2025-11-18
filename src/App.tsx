import { HeroUIProvider } from "@heroui/system";
import "./App.css";
import { TanStackProvider } from "./plugins/TanStackProvider";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "@heroui/toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HeroUIProvider>
            <TanStackProvider>
              <AppRouter />
              <ToastProvider />
            </TanStackProvider>
          </HeroUIProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
