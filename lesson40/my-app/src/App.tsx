import { useState } from 'react';
import './App.css'
// import { Text, Text1 } from './components/Text/Text'

// import styles from './App.module.css';

// import { Avatar } from './components/ui/Avatar';
// import { AvatarClassComponent } from './components/ui/Avatar/Avatar';
import { Card } from './components/ui/Card';
import { ProductCard } from './components/ProductCard';

// const sizeList = ['xs', 's', 'm', 'l', 'xs', 's', 'm', 'l', 'xs', 's', 'm', 'l', 'xs', 's', 'm', 'l'];

function App() {

  const [avatarSize, setAvatarSize] = useState('xs')
  const [shouldShow, setShouldShow] = useState(true);
  // const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setAvatarSize('l')
  }

  const handleShowHideClick = () => {
    setShouldShow(prev => !prev)
  }
  // useEffect(() => {
  //   // setInterval(() => {
  //   //   console.log(currentIndex, 'currentIndex')
  //   //   setAvatarSize(sizeList[currentIndex])
  //   //   setCurrentIndex(prev => {
  //   //     console.log(prev);
  //   //     return prev + 1
  //   //   })
  //   // }, 1000)
  // }, [currentIndex])

  // return (
  //   <>
  //     <section id="center">
  //       <Text>какой-то текст 1</Text> {/* Отступ 40px снизу */}
  //       <div className='text'>
  //         <h1>Get started</h1>
  //         <p>
  //           Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
  //         </p>
  //       </div>
  //       {/* <Text1 className={styles.title}>какой-то текст 2</Text1> {/* Отступ 20px снизу */}
  //       <Text1 className={styles.title2}>какой-то текст 2</Text1>

  //     </section>

  //   </>
  // )

  return (
    <section id="center">
      {/* <Avatar size={'m'}>IG</Avatar> { /* new Avatar({size: 'xs', children: 'IG'}).render() */}
      {/* <Avatar size="l" alt='afssaf' src='asfsaf' />
        <Avatar size="xs" variant='square'>DE</Avatar>
        <Avatar variant='rounded' fullName="Виталий Владиславович" /> */}
      {/* {shouldShow && <AvatarClassComponent size={avatarSize} variant='rounded'>TN</AvatarClassComponent>}
        <button onClick={handleClick}> click me</button>
        <button onClick={handleShowHideClick}> show/hide</button> */}
      <Card title="Мужские духи" description='Как этот код выглядел бы в самой первой версии реакта. Через React.CreateElement' />
      <ProductCard />
    </section>
  )
}

export default App
