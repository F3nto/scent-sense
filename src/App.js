import "./App.css";
import MainNavigator from "./Navigation/MainNavigator";
import { Provider } from "react-redux";
import { store } from "./Redux/app/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainNavigator />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
