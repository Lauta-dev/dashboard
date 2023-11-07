import { useState, useEffect } from 'react'
import { localStorageData } from './metadata.js'
import { getDataFromLocalStorage } from './utils.js'
import { List, Link } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Form from './form'

import './css/list.css'

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [value, setValue] = useState([])

  useEffect(() => {
    if (!localStorage.getItem(localStorageData.name)) {
      localStorage.setItem('data', JSON.stringify([]))
      return
    }

    setValue(getDataFromLocalStorage())
  }, [])

  function handleSubmit(data) {
    setValue(data)
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <section id='sec'>
          <Form data={handleSubmit} />

          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              maxHeight: 400,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {value.length ? value.map(({ name, url, id }, index) => {
              const zebra = index % 2 === 0 ? '#121212' : '#171717'

              return (

                <Link key={id} bgcolor={zebra} padding={2} href={url} underline='hover' >{name}</Link>

              )
            }) : "Cargando"}
          </List>
        </section>
      </ThemeProvider>
    </>
  )
}

export default App
