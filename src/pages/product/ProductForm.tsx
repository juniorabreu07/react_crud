import { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
import { Product } from "../../interfaces/Product";
import { MY_DATA } from "../../services/ApiService";
import { distinctUntilChanged } from 'rxjs/operators'
interface Props {
  addANewProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
}

type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  nombre: "",
  descripcion: "",
  precio: 0.00,
  logo: ''
};

export const ProductForm = ({ addANewProduct, editProduct }: Props) => {
  const [product, setProduct] = useState<Product>(inititalState);
  const [img, setImg] = useState({});
  const titleInput = useRef<HTMLInputElement>(null);
  MY_DATA
    .pipe(distinctUntilChanged((prev, curr) => prev.id !== curr.id)).subscribe((data) => {

      if (data.logo) {
        data = JSON.parse(JSON.stringify(data))
        data.logo = ''
      }
      setProduct(data);
    })

  const handleNewProduct = (e: FormEvent<HTMLFormElement>): any => {
    const form = new FormData();
    e.preventDefault();

    product.logo = img;
    Object.keys(product).forEach(key => {


      form.append(key, (product as any)[key]);
    });



    if (product.id) {
      editProduct(form as any);
    } else {
      addANewProduct(form as any);
    }
    setImg("")
    setProduct(inititalState);
    titleInput.current?.focus();
  };

  const handleInputChange = (event: HandleInputChange,) => {
    const { target: { name, value } } = event;

    if (name === 'logo') {
      setImg((event as any).target.files[0]);
    } else {
      setProduct({ ...product, [name]: value });
    }
  }

  useEffect(() => { })

  return (
    <div className="card card-body bg-secondary text-dark">
      <h1>Add a Product</h1>

      <form onSubmit={handleNewProduct}>
        <input
          type="text"
          placeholder="Write a Name"
          name="nombre"
          onChange={handleInputChange}
          value={product.nombre}
          className="form-control mb-3 rounded-0 shadow-none border-0"
          autoFocus
          ref={titleInput}
        />
        <input
          type="number"
          placeholder="Write a Price"
          name="precio"
          onChange={handleInputChange}
          value={product.precio}
          className="form-control mb-3 rounded-0 shadow-none border-0"
          autoFocus
          ref={titleInput}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          placeholder="Select Image"
          name="logo"
          onChange={handleInputChange}
          value={product.logo}
          className="form-control mb-3 rounded-0 shadow-none border-0"
          autoFocus
          ref={titleInput}
        />
        <textarea
          onChange={handleInputChange}
          name="descripcion"
          className="form-control mb-3 shadow-none border-0"
          placeholder="Write a Description"
          value={product.descripcion}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Save <AiOutlinePlus />
        </button>
      </form>
    </div>
  );
};
