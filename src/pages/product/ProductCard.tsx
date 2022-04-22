import { Product } from "../../interfaces/Product";
import React, { useEffect } from "react";
import { ApiService } from "../../services/ApiService";
interface Props {
  product: Product;
  deleteAProduct: (id: number) => void;
  selectProduct: (product: Product) => void;
}

export const ProductCard = ({ product, deleteAProduct, selectProduct }: Props) => {
  useEffect(() => { })

  return (

    <tr>
      <th scope="row">{product.id}</th>
      <th scope="row"><img src={`${product.logo ? ApiService.baseUrl + "/" + product.logo : "logo192.png"}`} height="50" width="50" />
      </th>
      <td>{product.nombre}</td>
      <td>{product.precio}</td>
      <td>
        <button
          className="btn btn-danger btn-block"
          onClick={() => product.id && deleteAProduct(product.id)}>
          Delete
        </button>
        <button
          className="btn btn-info btn-block"
          onClick={() => product.id && selectProduct(product)}>
          Edit
        </button>
      </td>
    </tr>
  )
}
