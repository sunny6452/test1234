import "./App.css";
import Payroll from "./view/Payroll";
import SendFailed from "./view/SendFailed";
import { Route } from "react-router";
import { PayrollProvider } from "./contexts/payrollData";
import { SendPayMailProvider } from "./contexts/SendPayMail";

function App() {
  return (
    <PayrollProvider>
      <SendPayMailProvider>
        <Route path="/" component={Payroll} />
        <Route path="/sendfailed" component={SendFailed} />
      </SendPayMailProvider>
    </PayrollProvider>
  );
}

export default App;
