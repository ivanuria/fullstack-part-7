import H2 from '../components/H2'
import { Typography } from '@mui/material'
const Home = () => {
  return (
    <>
      <H2>Welcome to BlogApp</H2>
      <Typography
        component='p'
        sx={{
          marginBlockEnd: '1em',
        }}
      >
        This is the Application realized for the{' '}
        <a href='https://fullstackopen.com/en/'>FullStack Open Course</a>{' '}
        offered by the University of Helsinky.
      </Typography>
      <Typography component='p'>
        This app presents the exercises from part 7 and can be found in{' '}
        <a href='https://github.com/ivanuria/fullstack-part-7'>
          this github repository
        </a>
        . I am fully aware that the Playwright tests are broken since the{' '}
        <em>style changes</em> with <a href='https://mui.com/'>MUI</a>.
      </Typography>
    </>
  )
}

export default Home
