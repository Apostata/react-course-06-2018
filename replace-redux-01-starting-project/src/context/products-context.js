import React, { createContext, useState } from 'react';

const initialProducts =  [
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ];
  

export const ProductsContext = createContext({
  products: [],
  toggleFavorites: (id) => {}
});

export default props => {
    const [productsState, setProdusctsState] = useState(initialProducts);

    const toggleFavorites = id => {
      setProdusctsState(productsState => {

        const prodIndex = productsState.findIndex(
          p => p.id === id
        );

        const newFavStatus = !productsState[prodIndex].isFavorite;
        const updatedProducts = [...productsState];

        updatedProducts[prodIndex] = {
          ...productsState[prodIndex],
          isFavorite: newFavStatus
        };
        return updatedProducts;
      })
    };

    return (
        <ProductsContext.Provider value={ {products: productsState, toggleFavorites} } >
            {props.children}
        </ProductsContext.Provider>
    );
};