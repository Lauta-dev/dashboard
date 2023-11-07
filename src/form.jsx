import { localStorageData } from "./metadata.js"
import { getDataFromLocalStorage } from "./utils.js"
import { Button, TextField } from '@mui/material';

import './css/form.css'
import { fetching } from "./fetch.js";

function Form({ data }) {
  async function handleSubmit(e) {
    e.preventDefault()

    if (!localStorage.getItem(localStorageData.name)) {
      localStorage.setItem('data', JSON.stringify([]))
    }

    const dataInput = Object.fromEntries(new FormData(e.target))
    await fetching({ dataInput })

    data(getDataFromLocalStorage())
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="name" name="name" label="Titulo" variant="standard" />
      <TextField id="url" name="url" label="Enlace" variant="standard" required />

      <Button type="submit" variant="contained">Guardar</Button>

    </form>
  )
}

export default Form