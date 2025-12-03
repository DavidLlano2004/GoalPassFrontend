import { HeroUIProvider } from "@heroui/system";
import "./App.css";
import { TanStackProvider } from "./plugins/TanStackProvider";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "@heroui/toast";
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
