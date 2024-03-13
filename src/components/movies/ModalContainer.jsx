import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';

import {AUTHTOKEN, TMDBURL, OPTIONS} from '../../utils/Constants';
import MovieTrailer from './MovieTrailer';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalContainer({selectedMovieID}) {
  
 const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [open, setOpen] = React.useState(true);
  const [notAvailable, setNotAvailable] = React.useState(false);
  const [dialogopen, setDailogOpen] = React.useState(false);

  useEffect(() => {
    try {
        if(!!selectedMovieID) {
            fetch(`${TMDBURL}/movie/${selectedMovieID}/videos?language=en-US`, OPTIONS)
            .then(response => response.json())
            .then(response => {
                if(!!response?.results[0]?.key) {
                    console.log('key is available => ', response?.results[0]?.key);
                    setSelectedVideoId(response?.results[0]?.key);
                    setNotAvailable(false);
                } else {
                    console.log('key is not available => ', response?.results[0]?.key);
                    setNotAvailable(true);
                    setDailogOpen(true);
                }
                
                setOpen(true);
    
            })
            .catch(err => console.error(err));
        }
    } catch (err) {
        console.error('in catch handler of selectedMovieID', err);
    };
  }, [selectedMovieID]);

  const handleDailogOpen = () => {
    setDailogOpen(true);
  };

  const handleDailogClose = () => {
    setDailogOpen(false);
  };

  const handleModalClose = () => {
    setOpen(false);
  };


  return (
    <div className='modal-container-cls'>
        {
            selectedVideoId !== null && !notAvailable ?
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleModalClose}
                slots={{ backdrop: StyledBackdrop }}
           >
                {
                    <ModalContent sx={{ width: '80vw'}}>
                        <MovieTrailer videoId={selectedVideoId} />
                    </ModalContent>
                }
           </Modal>
           :
           <Dialog
                open={dialogopen}
                onClose={handleDailogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='dialog-cls'
            >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Video is not available at the moment
                </DialogContentText>
            </DialogContent>
           </Dialog>
        }

    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.5);
    padding: 24px;
    color: grey[50];

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: grey[400];
      margin-bottom: 4px;
    }
  `,
);

