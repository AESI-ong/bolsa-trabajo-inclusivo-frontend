import { Card, CardContent, Typography, Grid } from '@mui/material';

type JobCardProps = {
  title: string;
  status: string;
  location: string;
  company: string;
  date?: string;
  candidates?: number;
};

const ApplicationCard: React.FC<JobCardProps> = ({ title, status, location, company,date, candidates }) => {
  return (
   <div  className='border-2 border-[#2C6CB6] rounded-lg p-6 mb-4'> 
       <Grid container spacing={2}>
  <Grid size={8}>
     <h3 className="text-2xl font-semibold mb-8 flex items-center">
        <img
            src="../../src/assets/applicantInfo/user_blue.svg"
            alt="usuario"
            width={30}
            height={30}
            className="mr-2"
               />
                        {title}
    </h3>

      <div className="flex items-center">
      <p className="flex items-center mr-4">
        <img
          src="../../src/assets/applicantInfo/home.svg"
          width={20}
          height={20}
          className="mr-2"
          alt="company"
        />
        {company}
      </p>

      <p className="flex items-center">
        <img
          src="../../src/assets/applicantInfo/pin.svg"
          width={20}
          height={20}
          className="mr-2"
          alt="pin"
        />
        {location}
      </p>
    </div>
  </Grid>
  <Grid size={4}>
    <p className="text-xl font-semibold mb-2 flex items-center text-[#2164B0]">{status}</p>
<p >{date}</p>

<p className="text-xl">{candidates} Candidatos postulando</p>

  </Grid>
  </Grid>
    </div>
  );
};

export default ApplicationCard;