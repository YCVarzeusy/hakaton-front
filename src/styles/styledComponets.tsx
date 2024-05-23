import { AvatarGroup, Avatar, Accordion, Modal } from '@mui/material';
import { styled } from '@mui/system';

export const  StyledAvatarGroup = styled(AvatarGroup)({
    '& .MuiAvatar-circular': {
        width: 20, 
        height: 20, 
        color: '#191A21', 
        fontSize: '0.75rem',
        fontWeight: 'bold',
        margin: '0 -2.5px', 
        flexdDirection: 'inherit',
    },
});



export const StyledAccordion = styled(Accordion)({
    backgroundColor: 'transparent',
    color: 'white',
    boxShadow: 'none', 
    '& .MuiAccordionSummary-root': {
      borderBottom: '1px solid white',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: 'white', // This sets the color of the expand icon
        '& .MuiSvgIcon-root': {
          color: 'white', // This sets the color of the SVG icon inside the expand icon
        },
      },
    '& .MuiAccordionDetails-root': {
      backgroundColor: 'transparent',
    },
  });


 export  const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)', // Aplica un efecto de desenfoque al fondo
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo blanco con transparencia
    },
  });