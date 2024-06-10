import { useParams } from "react-router-dom";

import {ProductDraever} from '@ui'

function index() {

    const { id } = useParams();
    const productId = Number(id);

  return <>
      <div>Product detalis {productId}</div>
      <ProductDraever id={productId} />
  </>  
}

export default index