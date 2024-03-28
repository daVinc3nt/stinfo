import type { NextPage } from "next";
import LogForm from "./log";
// import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { Service_box } from "@/components/Common/box";
import Service from "@/components/Service/service";
const Home: NextPage = () => {
  return (
    <>
      <Service />
    </>
  );
};

export default Home;
