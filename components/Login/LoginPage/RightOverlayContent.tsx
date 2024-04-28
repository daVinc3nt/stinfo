import React from 'react';
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import Image from 'next/image';
const welcome = <FormattedMessage id="signup.welcome.message" />
interface RightOverlayContentProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}


const RightOverlayContent: React.FC<RightOverlayContentProps> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="text-center bg-bk_library w-full h-full bg-cover">
      {/* <Image
        src="/Logo.png"
        alt={`Image full`}
        width={1000}
        height={1000}
        className='absolute h-full w-full object-contain'
      /> */}
      <div className="inset-0 bg-black/30 right-0 top-0 w-full h-full"/>
    </div>
  );
};

export default RightOverlayContent;
