import { AvatarGroup, Avatar } from '@mui/material';
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