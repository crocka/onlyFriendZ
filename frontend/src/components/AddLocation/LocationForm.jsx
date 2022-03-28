import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useApplicationData from '../../hooks/useApplicationData';
import AddPhoto from './AddPhoto';
import ChooseLocation from './ChooseLocation';
import Confirm from './Confirm';
import { useHistory } from "react-router-dom";
import { HistoryOutlined } from '@material-ui/icons';



const steps = ['Add Photos and Detials', 'Choose Location', 'Confirm Submission'];

export default function LocationForm(props) {

  const {initialPos} = props;
  const { createLocation } = useApplicationData();
  const [file, setFile] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory();

  // const [rating, setRating] = React.useState(5);

  // const [isDangerous, setIsDangerous] = React.useState(false);

  const [event, setEvent] = React.useState({

    title: '',
    description: '',
    is_dangerous: false,
    position: {lat: 43, lng: -79}

  });

  function resetEvent() {
    setEvent({
      title: '',
      description: '',
      is_dangerous: false,
      position: {lat: 43, lng: -79}
    })
  }

  // const [position, setPosition] = React.useState({

  //   lng: -79,
  //   lat: 43

  // })  

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if(activeStep === steps.length - 1){

      handleSubmit();

    }
    
  };

  const handleBack = () => {

    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };

  const handlePage = () => {

    if (activeStep === 0) {
      
      return (<AddPhoto 
        
        // handleSubmit={(event) => setEvent({...event})} 
        onFileChange={onFileChange} 
        // rating={rating} 
        // setRating={setRating} 
        // isDangerous={isDangerous}
        // setIsDangerous={setIsDangerous}

        setEvent={setEvent}
        event={event}

        />);

    } else if (activeStep === 1) {

      return (<ChooseLocation
      
        // position={position}
        // setPosition={setPosition}

        setEvent={setEvent}
        event={event}
        initialPos={initialPos}
      
      />);

    } else {

      return (<Confirm
      
        file={file}
      
      />);

    }

  };

  const handleSubmit = () => {

    // //:name, :email_address, :password, :password_confirmation, :birthday, :image_url, :instagram_handle, :twitter_handle, :tiktok_handle, :personal_link, :summary
    // event.preventDefault();
    // // const images = event.currentTarget.images.files; 
    console.log("Handle submit");
    const data = new FormData();

    data.append('latitude', event.position.lat);
    data.append('longitude', event.position.lng);

    for(let key of Object.keys(event)){

      data.append(key, event[key]);

    }

    for(let i = 0 ; i< file.length; i++) {
      
      data.append(`images[]`, file[i]);
      
    }

    // console.log(
    //   data.get('title'),
    //   data.get('description'),
    //   data.get('is_dangerous'),
    //   data.get('longitude'),
    //   data.get('latitude'),
    //   data.get('images[]')

    // )
    // console.log(data);
    console.log("Validate = " + validate(data));
    if (validate(data)) {
      console.log("Creating location");
      createLocation(data)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
    } else {
      alert("You must enter all the required fields.")
      resetEvent();
      setActiveStep(0);
    }
  };

  const onFileChange = event => {

    // Update the state
    setFile([...event]);
    // console.log(event)

  };

  const validate = (data) => {
    console.log(data.get('images[]'));
    if (data.get('title').trim() === '' || data.get('description').trim() === '' || data.get('longitude').trim() === '' || data.get('latitude').trim() === '' || data.get('images[]') === null) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {

          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );

        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            New location submitted. Thank you very much for your valuable contributions!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={() => history.push('/')}>Close</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>

            {handlePage()}

          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back

            </Button>

            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}