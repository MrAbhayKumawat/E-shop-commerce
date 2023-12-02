import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Componnents/Home/Home";
import ShearchResults from "./Componnents/Shearch/ShearchResults";
import CategoriesSerch from "./Componnents/CategoriesSerch/CategoriesSerch";
import SingleProduct from "./Componnents/SingleProduct/SingleProduct";
import ConatactDetails from "./Componnents/Contact/ConatactDetails";
import OrderPlaced from "./Componnents/OrderPlaced/OrderPlaced";

function App() {
  return (
    <>
      <BrowserRouter>
     
        <Routes>
          <Route path="/"  Component={Home} />
          <Route path="/ShearchResults"  Component={ShearchResults} />
          <Route path="/CategoriesSerch"  Component={CategoriesSerch} />
          <Route path="/SingleProduct"  Component={SingleProduct} />
          <Route path="/ConatactDetails"  Component={ConatactDetails} />
          <Route path="/OrderPlaced"  Component={OrderPlaced} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
