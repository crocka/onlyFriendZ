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


const steps = ['Add Photos and Detials', 'Choose Location', 'Confirm Submission'];

export default function LocationForm() {

  const { createLocation } = useApplicationData();

  const [file, setFile] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [rating, setRating] = React.useState(5);

  const [isDangerous, setIsDangerous] = React.useState(false);

  const [event, setEvent] = React.useState({});

  const [position, setPosition] = React.useState({

    longtitude: null,
    latitude: null

  })

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePage = () => {

    if (activeStep === 0) {
      
      return (<AddPhoto 
        
        handleSubmit={(event) => setEvent({...event})} 
        onFileChange={onFileChange} 
        rating={rating} 
        setRating={setRating} 
        isDangerous={isDangerous}
        setIsDangerous={setIsDangerous}
        
        
        />);

    } else if (activeStep === 1) {

      return (<ChooseLocation
      
        position={position}
        setPosition={setPosition}
      
      />);

    } else {

      return (<Confirm
      
        file={file}
      
      />);

    }

  };

  const handleSubmit = () => {

    //:name, :email_address, :password, :password_confirmation, :birthday, :image_url, :instagram_handle, :twitter_handle, :tiktok_handle, :personal_link, :summary
    event.preventDefault();
    // const images = event.currentTarget.images.files; 
    const data = new FormData(event.currentTarget);

    for(let i = 0 ; i< file.length; i++) {
      // console.log(typeof photos, "hi")
      data.append(`images[]`, file[i]);
      // photos.push(images[i])
    }

    createLocation(data)
      .then(res => {

        console.log(res);

      })
      .catch(err => console.log(err))

  };
  // });
  const onFileChange = event => {

    // Update the state
    setFile([...event]);
    // console.log(event)

  };


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
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
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}