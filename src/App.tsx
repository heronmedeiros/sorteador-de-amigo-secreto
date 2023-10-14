import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Form from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
    	<Route path="/" element={Form}/>
    </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
