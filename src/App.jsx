import { useState, useEffect } from 'react'
import { localStorageData } from './metadata.js'
import { getDataFromLocalStorage } from './utils.js'
import { List, Link, Button } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Form from './form'

function App() {
  const [value, setValue] = useState([])
  const [removeAllItems, setRemoveAllItems] = useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

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

          {value.length && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => {
              setRemoveAllItems(!removeAllItems)
            }} color="warning">Eliminar todo</Button>

            {removeAllItems && <div>
              <Button color="error" onClick={() => {
                localStorage.clear(localStorageData.name)
                setValue([])
              }}>SI</Button>

              <Button onClick={() => {
                setRemoveAllItems(false)
              }}>NO</Button>

            </div>}

          </div>
          }

          <List
            sx={{
              width: '100%',
              maxWidth: 560,
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
