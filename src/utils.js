import { localStorageData } from "./metadata.js";

export function getDataFromLocalStorage() {
  const data = localStorage.getItem(localStorageData.name)

  if (!data) return { msj: 'La db no existe', error: true }
  const parser = JSON.parse(data)

  return parser
}

export function setDataFromLocalStorage({ insert }) {
  const data = getDataFromLocalStorage()
  if (data?.error) return

  const newArray = [...data, { id: crypto.randomUUID(), ...insert }]
  const updateData = JSON.stringify(newArray)

  localStorage.setItem(localStorageData.name, updateData)
}
