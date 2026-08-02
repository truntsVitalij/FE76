import { useCallback, useEffect, useRef, useState } from 'react';

import './App.css'
import { Button } from './components/Button';

type TSeason = 'winter' | 'spring' | 'summer' | 'autumn';

function App() {
  const [count, setCount] = useState(0);
  const [season, setSeason] = useState('summer');
  const timer = useRef(null);
  // array[0] - значение
  // array[1] - функция, которая обновляет это значение

  // const userTotalSalary = useMemo(() => {
  //   doSomething() // очень сложные расчёты
  // }, [monthSalary, workingHours, position,]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      console.log('asfasffas')
    }, 5000)

    return () => {
      console.log('component unmounted')
      clearTimeout(timer.current);
    }
  }, []);

  // useEffect(() => {
  //   console.log("DO SOMETHING")
  // }, [season]);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1) // актуальное значение + 1

    if (count == 4) {
      setSeason('autumn');
    }
  }, [count])

  const handleChangeSeason = (season: TSeason) => {
    setSeason(season);
  }

  const selectAutumn = useCallback(() => {
    handleChangeSeason('autumn')
  }, [])

  const selectWinter = useCallback(() => {
    handleChangeSeason('winter')
  }, [])

  const selectSpring = useCallback(() => {
    handleChangeSeason('spring')
  }, [])

  return (
    <section id="center">
      <h3>Total count: {count}</h3>
      <Button onClick={handleClick} type='secondary'>Увеличь count</Button>

      <h3> my favorite time of year is {season}</h3>
      <Button onClick={selectAutumn} type='secondary'>Я люблю осень</Button>
      <Button onClick={selectWinter} type='secondary'>Я люблю зиму</Button>
      <Button onClick={selectSpring} type='secondary'>Я люблю весну</Button>
      <PostList className={styles} size="l" posts={[{}]} />
      <PostList className={styles} size="m" posts={[{}, {}, {}, {}]} />
      <PostList className={styles} size="s" posts={[{}, {}, {}, {}, {}, {}]} />
    </section>
  )
}

export default App

//   () => handleChangeSeason('autumn') === () => handleChangeSeason('autumn') // true
// { } === {} // false
// { x: 1 } === { x: 1 } // false



// let x = 1;
// let y = x;
