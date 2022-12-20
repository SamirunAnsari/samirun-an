import {
    createBrowserRouter, 
  } from "react-router-dom";
  import AddCategory from './components/Addcategory';
  import Addproduct from './components/Addproduct';
  import Showcategory from './components/Showcategory';
  import Showproduct from './components/Showproduct';
  import Home from './components/Home';
import App from "./components/App";
import Categorydelete from "./components/Categorydelete";
import Productdelete from "./components/Productdelete";
 import Updatecategory from "./components/Updatecategory";
import Updateproduct from "./components/Updateproduct";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path: "/",
            element: <Home/>,
          },
        {
            path: "/add-cat",
            element: <AddCategory/>,
          },
          {
            path: "/add-pro",
            element: <Addproduct/>,
          },
          {
            path: "/show-cat",
            element: <Showcategory/>,
          },
          {
            path: "/show-pro",
            element: <Showproduct/>,
          },
          {
            path: "/cat-delete/:id",
            element: <Categorydelete />,
          },
          {
            path: "/pro-delete/:id",
            element: < Productdelete />,
          },
          {
            path: "/cat-update/:id",
            element: < Updatecategory />,
          },
          {
            path: "/pro-update/:id",
            element: < Updateproduct />,
          },
      ]
    }
   
  ]);
  export default router;