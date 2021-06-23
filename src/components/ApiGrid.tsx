/** @jsxImportSource theme-ui **/
import { Grid, Button } from 'theme-ui'
import { useRouter } from 'next/router'

type ApiGridProps = {
  children: React.ReactNode
}

const ApiGrid = ({children}: ApiGridProps) => {
  const router = useRouter()
  return (
    <div>
      <Grid
        gap={'3%'}
        sx={{
          gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr'],
          rowGap: ['1%', '2%', '3%', '4%'],
        }}
      >
        {children}
      </Grid>
      <p
        sx={{
          mt: '5rem',
          fontFamily: 'Montserrat',
          fontSize: '1.25rem',
          lineHeight: '3.25rem',
          textAlign: 'center',
          letterSpacing: '-0.0625rem',
          color: 'text',
        }}
      >
        You reached the end of the list. <b>Don’t stop here!</b>
        <br />
        <Button
          variant="primaryLarge"
          onClick={() => {
            router.push('/apis/create?activeTab=create')
          }}
          sx={{ display: 'inline-block', ml: 3, mt: 4 }}
        >
          <span>Create New API</span>
        </Button>
      </p>
    </div>
  )
}

export default ApiGrid
