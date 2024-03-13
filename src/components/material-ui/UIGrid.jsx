// App.js
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StyledButton from '../../assets/styles';
import StyledButtonComp from './StyledButtonComp';

const UIGrid = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Material-UI
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">
            This is a simple React application using Material-UI components.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            You can customize and extend the UI easily.
          </Typography>
        </Grid>
      </Grid>

      <StyledButton>Styled Button</StyledButton>

      <StyledButtonComp>Styled Button Component</StyledButtonComp>

      

    </div>
  );
};

export default UIGrid

