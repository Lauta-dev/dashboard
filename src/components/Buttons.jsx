import { Button } from "@mui/material"
import { useState } from "react"
import { localStorageData } from "../metadata"

export function Buttons({ value }) {
  const [removeAllItems, setRemoveAllItems] = useState(false)

  function handleShowMenu() {
    setRemoveAllItems(!removeAllItems)
  }

  function handleLeesMenu() {
    setRemoveAllItems(false)
  }

  function handleRemoveAllItems() {
    localStorage.clear(localStorageData.name)
    value([])
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button onClick={handleShowMenu} color="warning">Eliminar todo</Button>

      {removeAllItems && <div>
        <Button onClick={handleRemoveAllItems} color="error">SI</Button>
        <Button onClick={handleLeesMenu}>NO</Button>
      </div>}

    </div>
  )
}