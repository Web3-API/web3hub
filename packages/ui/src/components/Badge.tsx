/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'
import { cloudFlareGateway } from '../constants'

type BadgeProps = {
  label: string
  ipfsHash?: string
  onDark?: boolean
}

const Badge = ({ label, onDark, ipfsHash }: BadgeProps) => {
  return (
    <div
      sx={{
        border: '0.125rem solid',
        textTransform: 'uppercase',
        borderColor: onDark ? '#CAD9F3' : '#EFF5F4',
        borderRadius: '0.5rem',
        px: 2,
        py: 1,
        mx: 2,
        color: onDark ? '#CAD9F3' : 'w3green',
        fontFamily: '"Poppins"',
        fontWeight: '600',
        fontSize: '0.75rem',
        lineHeight: '1.125rem',
        cursor: ipfsHash ? 'pointer' : 'default'
      }}
      onClick={()=>{
        if(ipfsHash) {
          window.open(cloudFlareGateway+ipfsHash)
        }
      }}
    >
      {label}
    </div>
  )
}

export default Badge
