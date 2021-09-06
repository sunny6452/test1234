import "./App.css";
import Payroll from "./view/Payroll";
import LoginView from "./view/LoginView";
import ModalForm, { ConfirmBox } from "./view/ModalForm";
import { Route } from "react-router";
import { PayrollProvider } from "./contexts/payrollData";
import { SendPayMailProvider } from "./contexts/SendPayMail";

function App() {
  return (
    <PayrollProvider>
      <SendPayMailProvider>
        <Route path="/login" component={Payroll} />
        <Route path="/" component={LoginView} exact={true} />
        <Route path="/history" component={ModalForm} />
        <Route path="/confirm" component={ConfirmBox} />
      </SendPayMailProvider>
    </PayrollProvider>
  );
}

export default App;
