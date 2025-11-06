import { HeroUIProvider } from "@heroui/system";
import "./App.css";
import { TanStackProvider } from "./plugins/TanStackProvider";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <>
      <HeroUIProvider>
        <TanStackProvider>
          <AppRouter />
        </TanStackProvider>
      </HeroUIProvider>
    </>
  );
}

export default App;
