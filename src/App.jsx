import { useState, useEffect } from 'react'
import { localStorageData } from './metadata.js'
import { getDataFromLocalStorage } from './utils.js'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Form from './form'
import { Buttons } from './components/Buttons.jsx';
import { ListOfLinks } from './components/List-of-links.jsx';

function App() {
  const [value, setValue] = useState([])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  function sendData(data) {
    setValue(data)
  }

  useEffect(() => {
    if (!localStorage.getItem(localStorageData.name)) {
      localStorage.setItem(localStorageData.name, JSON.stringify([]))
      return
    }

    sendData(getDataFromLocalStorage())
  }, [])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <section id='sec'>
          <Form data={sendData} />
          {value.length > 0 && <Buttons value={sendData} />}
          {value.length > 0 && <ListOfLinks value={value} />}
        </section>
      </ThemeProvider>
    </>
  )
}

export default App
