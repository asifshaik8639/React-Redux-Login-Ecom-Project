// StyledButton.js
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const StyledButtonComp = styled(Button)`
  border-radius: 20px;
  color: white;
  padding: 30px;
  background-color: green;
  &:hover {
    background-color: red;
  }
`;

export default StyledButtonComp;
