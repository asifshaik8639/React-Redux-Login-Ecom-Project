import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const StyledButton = styled('Button')({
  borderRadius: '8px',
  padding: '10px 20px',
  backgroundColor: 'red',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
});

export default StyledButton;