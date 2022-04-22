import React, { useEffect } from "react";
import { Product } from "../../interfaces/Product";
import { BiTaskX } from "react-icons/bi";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../services/ApiService";



interface Props {
  products: Product[];
  deleteAProduct: (id: number) => any;
  selectProduct: (product: Product) => any;
}


export const ProductList = ({ products, deleteAProduct, selectProduct }: Props): JSX.Element => {

  let navigate = useNavigate()
  useEffect(() => {
    if (ApiService.getCurrentUser() == null) {
      navigate("/");
    }
  }, []);
  if (products.length === 0)
    return (
      <div className="row text-light text-center">
        <h1>There are no products yet</h1>
        <BiTaskX size="20rem" />
      </div>
    );

  return (
    <div className="row">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} deleteAProduct={deleteAProduct} selectProduct={selectProduct} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
