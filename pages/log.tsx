import type { NextPage } from "next";
import { LoginPage } from "@/components/Login/LoginPage";
// import Footer from "../components/Footer/Footer";

import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
const LogForm: NextPage = () => {
  return (
    <>
      <LoginPage/>
    </>
  );
};

export default LogForm;

