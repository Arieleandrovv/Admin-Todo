import WidgetItem from '@/components/WidgetItem';
import { Product, products } from '@/products/data/products';
import { ItemCard } from '@/shopping-cart/components/ItemCard';
import { cookies } from 'next/headers';
import React from 'react';

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default async function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse((await cookieStore).get('cart')?.value ?? '{}');
  const productsInCart = getProductsInCart(cart);
  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0,
  );
  return (
    <div>
      <h1>productos en el carrito</h1>
      <hr />
      <div className='flex flex-col sm:flex-row gap-2'>
        <div className=' flex flex-col w-full gap-2 sm:w-8/12'>
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className='flex flex-col w-full sm:w-4/12 '>
          <WidgetItem title={'total a pagar'}>
            <div className='mt-2 flex justify-center text-black'>
              <h3>${(totalToPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className='font-bold text-center text-black'>
              impuestos: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
