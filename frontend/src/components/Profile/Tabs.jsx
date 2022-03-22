import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Tabs(props) {

  const { tabLabels, children } = props;

  const arrayChildren = React.Children.toArray(children);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">

            {tabLabels.map((label, index) => {

              return (<Tab value={index + 1} label={label} />);
            })}

          </TabList>
        </Box>


        {arrayChildren.map((child, index) => {

          return (<TabPanel value={index + 1} >{child}</TabPanel>);

        })}

      </TabContext>
    </Box>
  );
}