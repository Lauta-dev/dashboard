import { setDataFromLocalStorage } from "./utils.js"

function evaluate({ dataInput }) {
  if (typeof dataInput.name !== 'string' && typeof dataInput.url !== 'string') {
    return
  }

  if (!dataInput.name || !dataInput.url) {
    return
  }

  if (!dataInput.url.startsWith('https://')) {
    return
  }
}

export async function fetching({ dataInput }) {
  evaluate({ dataInput })

  try {
    const req = await fetch(`${import.meta.env.VITE_API_URL}${dataInput.url}`)
    const { title } = await req.json()
    const userTitle = dataInput.name ? dataInput.name : title[1]

    const insert = {
      name: userTitle,
      url: dataInput.url,
    }

    console.log('destro del fetching')


    setDataFromLocalStorage({ insert })
  } catch (error) {
    console.log(error)
  }
}