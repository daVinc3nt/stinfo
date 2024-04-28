import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainInfo from './content/MainInfo';
import ContactInfo from './content/ContactInfo';
import MedicalInfo from './content/MedicalInfo';
import FamilyInfo from './content/FamilyInfo';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ColorTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
        <Box sx={{ width: '96%', borderTopLeftRadius:'12px', borderTopRightRadius: '12px', boxShadow:'white' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white.main', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBotLeftRadius: '12px', borderBotRightRadius: '12px',display: 'flex',
            justifyContent: 'center',
           }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{
      style: { backgroundColor: 'secondary.main' } 
    }}>
          <Tab label="Trang chủ" {...a11yProps(0)} />
          <Tab label="Liên lạc" {...a11yProps(1)} />
          <Tab label="Y tế" {...a11yProps(2)} />
          <Tab label="Gia đình" {...a11yProps(3)} />
        </Tabs>
      </Box>
      
      <CustomTabPanel value={value} index={0}>
          <ContactInfo/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
         <ContactInfo/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
          <MedicalInfo/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
            <FamilyInfo/>
      </CustomTabPanel>
    </Box>
    
    </div>
    
  );
}


