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
        <Route path="/" component={Payroll} exact={true} />
        <Route path="/login" component={LoginView} />
        <Route path="/history" component={ModalForm} />
        <Route path="/confirm" component={ConfirmBox} />
      </SendPayMailProvider>
    </PayrollProvider>
  );
}

export default App;
