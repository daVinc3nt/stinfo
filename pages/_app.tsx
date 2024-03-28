import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import { useState, useEffect, createContext } from "react";
import { Libraries, LoadScript, LoadScriptProps } from "@react-google-maps/api";
import { Spinner } from "@material-tailwind/react";
import { Socket, io } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);
const googleMapsLibraries: Libraries = ["places"];

function MyApp({ Component, pageProps }: AppProps) {
  const socket = io('https://api.tdlogistics.net.vn', { transports: ['websocket'] });
  function Loading() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const handleStart = (url) => url !== router.asPath && setLoading(true);
      const handleComplete = (url) =>
        url === router.asPath && setLoading(false);

      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      // Clean up the event listeners when the component unmounts
      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      };
    }, [router]); // Add router to the dependency array

    return (
      loading && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white opacity-75">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )
    );
  }

  const { locale } = useRouter();
  const messages = {
    vi,
    en,
  };

  return (
    <>
      <SocketContext.Provider value={socket}>
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Wrapper><Loading />
              <Component {...pageProps} />
            </Wrapper>
        </IntlProvider>
      </SocketContext.Provider>
    </>
  );
}

export default MyApp; 


