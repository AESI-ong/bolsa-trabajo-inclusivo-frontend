import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MiAreaSVG from '../../assets/UserMenu/mi_area.svg';
import MiCvSVG from '../../assets/UserMenu/mi_cv.svg';
import PostulacionesSVG from '../../assets/UserMenu/mis_postulaciones.svg';
import CerrarSesionSVG from '../../assets/UserMenu/cerrar_sesion.svg';
import NotificacionSVG from '../../assets/UserMenu/notificacion.svg';
import { useNavigate } from 'react-router-dom';


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(0),
    color: 'rgb(0, 0, 0)',
    border: '3px solid yellow',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      width: '175px', 
      fontSize: '14px', 
      '& .MuiSvgIcon-root': {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const navigate = useNavigate();

  const redirectMiCV = () => {
    navigate('/mi-cv'); // Use navigate instead of window.location.href
  };
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
       <Button
      id="demo-customized-button"
      aria-controls={open ? 'demo-customized-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      variant="outlined" // Use outlined for a border
      disableElevation
      onClick={handleClick}
      sx={{
        borderColor: 'yellow',
        borderWidth: 3, 
        backgroundColor: 'white', 
        rounded: '4px', // Rounded corners
        padding: '8px',
        color: 'black',
        width: '180px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly change background on hover
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <img src={NotificacionSVG} style={{ width: 18, height: 18, marginRight: '8px' }} />
          <p className='font-bold'>9</p>
        <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: 'yellow' }} />
          <p className='font-bold'>Juan Perez</p>
      </Box>
    </Button>
      <StyledMenu
        id="demo-customized-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'demo-customized-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
        <img src={MiAreaSVG} style={{ width: 18, height: 18, marginRight: '8px' }} />
          Mi área
        </MenuItem>
        <MenuItem onClick={redirectMiCV} disableRipple>
          <img src={MiCvSVG} style={{ width: 18, height: 18, marginRight: '8px' }} />
          Mi CV
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <img src={PostulacionesSVG}  style={{ width: 18, height: 18, marginRight: '8px' }} />
          Mis Postulaciones
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <img src={CerrarSesionSVG} style={{ width: 18, height: 18, marginRight: '8px' }} />
          Cerrar sesión
        </MenuItem>
      </StyledMenu>
    </div>
  );
}