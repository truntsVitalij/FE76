// import { useState } from 'react'
import './App.css'
import {ProductCard} from "./components/productCard"
import { Pizza } from './components/Pizza';

// WB
import {ProductList} from './WBPage/ProductList'

function App() {
    //const [count, setCount] = useState(0)
  
  const pizzaList = [
    {
    name: "Pepperoni",
    size: 'm'
    }, 
    {
    name: "Vegan",
    size: 's'
    },
    {
    name: "",
    size: 'l'
    }
  ];
  // const list = pizzaList.map((pizza, index) => (
  //     <Pizza 
  //     key={index.id}
  //     name={pizza.name} 
  //     size={pizza.size}
  //     />))
  const list = pizzaList.map(({name, size, id, withCheeseBoards}) => ( //деструктуризация
      <Pizza 
      key={id}
      name={name} 
      size={size}
      withCheeseBoards={withCheeseBoards}
      />))

  return (
    <>

{/* WB */}
    <ProductList /> 

    <div className='App'>
    
    <ProductCard 
    name="Laptop"
    price={1000}
    category="Computer equipment"
    retailPrice={800}
    />

    <ProductCard
    name="Watch"
    price={500}
    category="Computer equipment"
    retailPrice={400}
    />

    {list}

   </div>
   </>
    )
}

export default App
