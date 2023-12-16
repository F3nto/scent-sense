import "./App.css";
import MainNavigator from "./Navigation/MainNavigator";
import { Provider } from "react-redux";
import { store } from "./Redux/app/store";
function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

export default App;
