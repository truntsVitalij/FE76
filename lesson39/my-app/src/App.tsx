import './App.css'
import { Pizza } from './components/pizza'

function App() {

  const pizzaList = [
    {
      name: 'пеперони',
      id: 'pizza-1'
    }, {
      name: '4 сыра',
      size: 'l',
      withCheeseBoards: true,
      id: 'pizza-2'
    }, {
      size: 's',
      id: 'pizza-3'
    }, {
      name: 'italiano',
      size: 'm',
      id: 'pizza-4'
    }
  ];

  // const list = pizzaList.map(pizza => <Pizza key={pizza.id} name={pizza.name} size={pizza.size} withCheeseBoards={pizza.withCheeseBoards} />)

  return (
    <>
      <section id="center">
        {
          pizzaList.map(({ name, size, id, withCheeseBoards }) => <Pizza key={id} name={name} size={size} withCheeseBoards={withCheeseBoards} />)
        }

        {/* {list} */}
      </section>
    </>
  )
}

export default App
