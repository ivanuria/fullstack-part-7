import { Typography } from '@mui/material'

const H2 = ({ children, sx = {} }) => {
  return (
    <Typography
      component='h2'
      variant='h4'
      sx={{
        textAlign: 'center',
        marginBlockEnd: '1em',
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

export default H2
