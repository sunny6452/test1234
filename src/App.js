import "./App.css";
import Payroll from "./view/Payroll";
import SendFailed from "./view/SendFailed";
import { Route } from "react-router";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Payroll} />
      <Route path="/sendfailed" component={SendFailed} />
    </div>
  );
}

export default App;
