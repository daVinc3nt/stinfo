import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MainInfo from './content/MainInfo';
import ContactInfo from './content/ContactInfo';
import MedicalInfo from './content/MedicalInfo';
import FamilyInfo from './content/FamilyInfo';

export interface Page {
  label: string; // Tên của trang
  component: React.FC; // Component tương ứng của trang
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ColorTabsProps {
  pages: Page[]; // Define prop to accept array of pages
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

const ColorTabs: React.FC<ColorTabsProps> = ({ pages }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ width: '96%', borderTopLeftRadius:'12px', borderTopRightRadius: '12px', boxShadow:'white' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white.main', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBotLeftRadius: '12px', borderBotRightRadius: '12px',display: 'flex', justifyContent: 'center' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ style: { backgroundColor: 'secondary.main' } }}>
            {pages.map((page, index) => (
              <Tab key={index} label={page.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {pages.map((page, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <page.component />
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
};

export default ColorTabs;
