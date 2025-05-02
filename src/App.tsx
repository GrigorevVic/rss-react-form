import { ReactHookForm } from "./components/ReactHookForm";
import { UncontrolledForm } from "./components/UncontrolledForm";
import { HomePage } from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

import "./style.css";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="UncontrolledForm" element={<UncontrolledForm />}></Route>
          <Route path="ReactHookForm" element={<ReactHookForm />}></Route>
          </Route>
      </Routes>
    </div>
  );
}


export default App;
