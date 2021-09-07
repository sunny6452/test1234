import "./App.css";
import Payroll from "./view/Payroll";
import LoginView from "./view/LoginView";
import ModalForm, { ConfirmBox } from "./view/ModalForm";
//import { Route } from "react-router";
import { PayrollProvider } from "./contexts/payrollData";
import { SendPayMailProvider } from "./contexts/SendPayMail";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <PayrollProvider>
      <SendPayMailProvider>
        {/* <LoginView />
        <Payroll /> */}
        <Switch>
          <Route path="/Payroll" component={Payroll} />
          <Route path="/history" component={ModalForm} />
          <Route path="/confirm" component={ConfirmBox} />
          <Route path="/" component={LoginView} />
        </Switch>
      </SendPayMailProvider>
    </PayrollProvider>
  );
}

export default App;
