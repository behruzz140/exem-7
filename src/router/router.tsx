import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

import App from "../App";
import { Arror, Category,SubCategory , Brand , Settings , BrandCategory, SingleBrandCategory , Product , ProductDetalis} from "@pages"
import Signin from "../pages/signin"
import Signup from "../pages/signup"
import {HomeLayout} from "@layut"

const index = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            {/* <Route index element={<Auth />} /> */}
            <Route index element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home/*" element={<HomeLayout />} >
                <Route index element={<Category />} />
                <Route path="category/:subcategory" element={<SubCategory /> } /> 
                <Route path="brands" element={<Brand />} />
                <Route path="brand-catigory" element={<BrandCategory />} />
                <Route path="brands/:brandId" element={<SingleBrandCategory/>} />
                <Route path="settings" element={<Settings />} />
                <Route path="products" element={<Product />} />
                <Route path="products/:id" element={<ProductDetalis/>} />
            </Route>  
            <Route path="*" element={<Arror />} />
            
          </Route>
        )
      );
      return <RouterProvider router={router} />;
}

export default index;