import { useState } from 'react'
import Title from "./components/title/title";
import Alert from "./components/alert/alert";
import HamburgerButton from "./components/humburgerButton/humburgerButton";


function App() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Title>Sign In</Title>
 
      <HamburgerButton
        opened={opened}
        onClick={() => setOpened(!opened)}
      />

      <Alert type="warning">
        Lorem Ipsum
      </Alert>

      <Alert type="error">
        Lorem Ipsum
      </Alert>

      <Alert type="success">
        Lorem Ipsum
      </Alert>

      <Alert type="info">
        Lorem Ipsum
      </Alert>

      <Alert type="primary">
        Lorem Ipsum
      </Alert>


    </>
  )
}

export default App
