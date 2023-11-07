import { localStorageData } from "./metadata.js"
import { getDataFromLocalStorage, setDataFromLocalStorage } from "./utils.js"
import { Button, TextField } from '@mui/material';

import './css/form.css'

function Form({ data }) {

  async function handleSubmit(e) {
    e.preventDefault()

    if (!localStorage.getItem(localStorageData.name)) {
      localStorage.setItem('data', JSON.stringify([]))
    }

    const dataInput = Object.fromEntries(new FormData(e.target))

    if (!dataInput.name && !dataInput.url && !dataInput.url.startsWith('http')) {
      return
    }

    const req = await fetch(`${import.meta.env.VITE_API_URL}${dataInput.url}`)
    const { title, favicon } = await req.json()

    const insert = {
      name: title[1],
      url: dataInput.url,
    }

    setDataFromLocalStorage({ insert })

    data(getDataFromLocalStorage())

  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="name" name="name" label="Titulo" variant="standard" />
      <TextField id="url" name="url" label="Enlace" variant="standard" />

      <Button type="submit" variant="contained">Guardar</Button>

    </form>
  )
}

export default Form