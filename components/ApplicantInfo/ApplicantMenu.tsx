import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type ApplicantMenuProps = {
    onSelect: (section: string) => void;
};

const ApplicantMenu = ({ onSelect }: ApplicantMenuProps) => {
    return (
       <Stack className="px-30 py-8 pl-8 max-w-7xl mx-auto" direction="row" spacing={2} justifyContent="start" >
          <Button
                onClick={() => onSelect('cv')}
                sx={{
                    backgroundColor: "#8AAFD9",
                    color: "#2164B0",
                    paddingX: 3,
                    paddingY: 2,
                    borderRadius: 1,
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                        backgroundColor: "#4A90E2",
                    },
                }}
            >
                Mi Curriculum
            </Button>
            <Button
                onClick={() => onSelect('postulaciones')}
                sx={{
                    backgroundColor: "#8AAFD9",
                    color: "#2164B0",
                    paddingX: 3,
                    paddingY: 2,
                    borderRadius: 1,
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                        backgroundColor: "#4A90E2",
                    },
                }}
            >
                Mi Postulaciones
            </Button>
      
        </Stack>
    );
};

export default ApplicantMenu;