import { useState, useEffect } from "react";

// Components
import React from "react";
import { ProductForm } from "./ProductForm";
import { Product } from "../../interfaces/Product";
import { ProductList } from "./ProductList";
import { ApiService, MY_DATA } from "../../services/ApiService";

interface Props {
  title?: string;
}

export const ProductView = ({ title = "default title" }: Props): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();



  const selectProduct = (product: Product): void => {
    MY_DATA.next(product);
    setProduct(product);
  }
  const editProduct = async (product: Product): Promise<void> => {
    let res = await ApiService.put(`/api/v1/products/${product.id}`, product, { 'Content-Type': 'multipart/form-data' }).then(res => res.data);
    getProducts();
  }
  const addANewProduct = (product: Product): void => {

    createProduct(product);
  }

  const createProduct = async (product: Product) => {
    let res = await ApiService.post(`/api/v1/products`, product, { 'Content-Type': 'multipart/form-data' }).then(res => res.data);
    getProducts();
    return res;
  }

  const deleteAProduct = async (id: number): Promise<void> => {
    let product = products.filter((product) => product.id === id)

    await deleteProduct(product[0]);

    getProducts();

  }

  const deleteProduct = async (product: Product) => {
    let res = await ApiService.delete(`/api/v1/products`, product).then(res => res.data);

    return res;
  }

  const getProducts = async () => {
    let res = await ApiService.get('/api/v1/products').then(res => res.data);
    setProducts(res.data);
  }

  const apiLogout = async () => {
    let res = await ApiService.post('/api/v1/auth/signout', {}).then(res => res.data);

  }


  useEffect(() => {
    getProducts();
  }, [])

  const logout = async () => {
    ApiService.logout();
    await apiLogout();
  }




  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            {/* <img src={logo} alt="React Logo" style={{ width: "4rem" }} /> */}
            {title}
          </a>
          <form className="d-flex">
            <button
              className="btn btn-info btn-block"
              onClick={logout}>
              Logout
            </button>
          </form>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col">
            <ProductForm addANewProduct={addANewProduct} editProduct={editProduct} />
          </div>
          <div className="col">
            <div className="card p-4">
              <ProductList products={products} deleteAProduct={deleteAProduct} selectProduct={selectProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
