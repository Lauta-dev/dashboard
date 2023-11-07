import { Link, List } from "@mui/material"

export function ListOfLinks({ value }) {

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 260,
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
      {value.map(({ name, url, id }, index) => {
        const zebra = index % 2 === 0 ? '#121212' : '#171717'

        return (
          <Link key={id} bgcolor={zebra} padding={2} href={url} underline='hover' >{name}</Link>
        )
      })}
    </List>
  )
}