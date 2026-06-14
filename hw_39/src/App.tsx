import React from 'react';
import ProductList from './components/productList';
// import ProductCard from './components/ProductCard';
import type { IProduct } from './components/types/product';
import './App.css';

const App: React.FC = () => {
  const products: IProduct[] = [
    {
      id: 1,
      title: 'Платье женское летнее',
      brand: 'Love Republic',
      price: 2999,
      oldPrice: 5999,
      rating: 4.7,
      reviews: 128,
      image: 'https://mns-basket-cdn-02.geobasket.net/vol9297/part929758/929758262/images/big/1.webp',
      badge: '-50%'
    },
    {
      id: 2,
      title: 'Кроссовки спортивные',
      brand: 'Nike',
      price: 7499,
      oldPrice: 9999,
      rating: 4.9,
      reviews: 345,
      image: 'https://mns-basket-cdn-04.geobasket.net/vol3150/part315007/315007255/images/big/1.webp',
      badge: '-25%'
    },
    {
      id: 3,
      title: 'Сумка кожаная',
      brand: 'Zarina',
      price: 3999,
      oldPrice: 7999,
      rating: 4.5,
      reviews: 89,
      image: 'https://mns-basket-cdn-04.geobasket.net/vol10041/part1004186/1004186737/images/big/1.webp',
      badge: '-50%'
    },
    {
      id: 4,
      title: 'Часы наручные',
      brand: 'Casio',
      price: 5499,
      oldPrice: 8999,
      rating: 4.8,
      reviews: 212,
      image: 'https://basket-25.wbbasket.ru/vol4396/part439663/439663807/images/big/1.webp',
      badge: '-39%'
    },
    {
      id: 5,
      title: 'Джинсы бананы',
      brand: 'Levi\'s',
      price: 4999,
      oldPrice: 8999,
      rating: 4.6,
      reviews: 167,
      image: 'https://mns-basket-cdn-04.geobasket.net/vol8201/part820183/820183720/images/big/1.webp',
      badge: '-44%'
    },
    {
      id: 6,
      title: 'Пальто осеннее',
      brand: 'Mango',
      price: 12999,
      oldPrice: 19999,
      rating: 4.9,
      reviews: 56,
      image: 'https://mns-basket-cdn-02.geobasket.net/vol2659/part265940/265940264/images/big/1.webp',
      badge: '-35%'
    }
  ];

  return (
    <div className="app">
      <ProductList list={products} />
    </div>
  );
};

export default App;