// components/CustomSnackbar.tsx
import { Snackbar, Alert } from '@mui/material';

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const CustomSnackbar = ({
  open,
  onClose,
  message,
  severity = 'info',
  duration = 4000,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
