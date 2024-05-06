import { useState} from "react";
import SigninForm from "./SigninForm";
import RightOverlayContent from "./RightOverlayContent";
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";
import ParticlesBackground from "@/components/Particle/Particle"
const LoginPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const intl = useIntl();
  const overlayBg =
    "bg-DarkRedGradient";

  return (
    <>
    <div className=" flex flex-col text-black items-center justify-center fixed z-50 inset-0 ">
      <div className= "container w-full h-full bg-white overflow-hidden">          
          <div
            id="signin"
            className="absolute bg-BlueGradient left-0 
            h-screen w-full flex justify-center 
            items-center transition-all 
            duration-700 ease-in-out z-20"
          >
            <SigninForm />
          </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
