export interface Product {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  logo?: any;
  createdAt?: Date;
  updatedAt?: Date;
}