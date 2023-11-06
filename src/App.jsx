import { useState, useEffect } from 'react'
import { localStorageData } from './metadata.js'
import { getDataFromLocalStorage, setDataFromLocalStorage } from './utils.js'
import Form from './form'

import './css/list.css'

function App() {
  const [value, setValue] = useState([])
  const [v, setV] = useState()

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
      <section>
        <Form data={handleSubmit} />

        <div>
          <ul>
            {value.length ? value.map(({ name, url, id, image }, index) => {
              const zebra = index % 2 === 0 ? '#ffffff' : '#F5F5F5'

              return (
                <li className='list' key={id} style={{ backgroundColor: zebra }}>
                  <div>
                    <a href={url}>{name}</a>

                  </div>
                </li>
              )
            }) : "Cargando"}
          </ul>
        </div>
      </section>

    </>
  )
}

export default App
