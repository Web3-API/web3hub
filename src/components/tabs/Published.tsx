/** @jsxImportSource theme-ui **/
import { Flex, Button, Themed } from 'theme-ui'
import { useRouter } from 'next/router'

const Published = () => {
  const router = useRouter()
  return (
    <Flex
      className="published"
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/images/thinking-emoji.svg" alt="thinking" sx={{ mb: 4 }} />
      <Themed.h5
        sx={{
          fontFamily: 'Montserrat',
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
          textAlign: 'center',
          letterSpacing: '-0.01em',
          color: 'text',
        }}
      >
        Looks like you did not publish an API yet!
      </Themed.h5>
      <Button
        variant="primaryLarge"
        onClick={() => {
          router.push('/apis/create?activeTab=create')
        }}
        sx={{ display: 'inline-block', ml: 3, p: '1.5rem', px: '2.5rem' }}
      >
        <span>Create New API</span>
      </Button>
    </Flex>
  )
}

export default Published
