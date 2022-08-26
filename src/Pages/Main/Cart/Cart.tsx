import React from "react";
import { Breadcrumbs } from "../../../Components";
import ShoppingCart from "../../../Components/ShoppingCart/ShoppingCart";
import {useGetPokemonByNameQuery} from '../../../api/cart'
const Cart = () => {

    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

    console.log('zz',data)

  return (
    <>
      <Breadcrumbs title={"cart"} />
      <ShoppingCart />
    </>
  );
};

export default Cart;
