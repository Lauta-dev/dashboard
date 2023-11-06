import { localStorageData } from "./metadata.js"
import { getDataFromLocalStorage, setDataFromLocalStorage } from "./utils.js"
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

      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="url">Url</label>
      <input type="url" name='url' id='url' required />

      <button type="submit">asd</button>
    </form>
  )
}

export default Form