export default (state:any, action:any) => {
  switch (action.type) {
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product:any) => {
          return product.id !== action.payload;
        })
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case 'EDIT_PRODUCT':
      const updateProduct = action.payload;

      const updateProducts = state.products.map((product:any) => {
        if (product.id === updateProduct.id) {
          return updateProduct;
        }
        return product;
      })
      return {
        ...state,
        products: updateProducts
      }

    default:
      return state;
  }
}