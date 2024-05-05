import { Button } from '@mui/material'
import React from 'react'
import theme from '../../Theme';

type Props = {
    children: React.ReactNode;
}

const ApplyButton:React.FC<Props> = ({children}) => {
  return (
    <Button   sx={{
        '&:hover': {
          backgroundColor: theme.colorConstants.lightGreen,
        },
        width: '100%',
        backgroundColor: theme.colorConstants.lightGreen,
        color: theme.colorConstants.black,
        height: '3rem',
        fontWeight: 'bold',
        fontSize: '1rem',
      }}>
{children}
    </Button>
  )
}

export default ApplyButton