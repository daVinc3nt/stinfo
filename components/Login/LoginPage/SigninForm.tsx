import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import LoginLangSelector from "@/components/LangSelector/LoginLangSelector"
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { AdminOperation, StudentOperation, TeacherOperation } from "@/ambLib/amb";
interface FormValues {
  email?: string;
  phoneNumber?: string;
  otp?: string;
  role?: string;
  name?: string;
  pass?: string;
}
interface ErrorValues {
  emailEr: string;
  phoneNumberEr: string;
  nameEr: string;
  passEr: string;
}
const SigninForm = () => {
  const welcome = <FormattedMessage id="signup.welcome.message" />
  const initialValues: FormValues = { name: "", pass: "" };
  const initialValues2: ErrorValues = { emailEr: "", phoneNumberEr: "", nameEr: "", passEr: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  const [shake, setshake] = useState(false);
  const router = useRouter();


  const buttonstyle = classNames(
    "mt-7 py-3 px-4  w-[calc(95%)] rounded-full text-white font-bold uppercase text-xs text-center block focus:outline-none cursor-pointer active:scale-110 sm:mt-10 sm:text-sm transition duration-150",
    {
      ["bg-blue-200 animate-shake"]: shake,
      ["bg-blue-600"]: !shake,
    }
  );


  const handlePass = async (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, pass: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 2);
  };

  const handleName = async (change: string) => {
    const value = change
    const updatedFormValues = { ...formValues, name: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 1);
  };





  const signIn = async () => {
    const { name, pass } = formValues;
    const { nameEr, passEr } = formErrors;
    handleName(name);
    handlePass(pass);
    if (nameEr || passEr) { setshake(true); return }
    await adAuth();
  }

  const adAuth = async () => {
    const { name, pass } = formValues;
    if (!name || !pass)
      return null;
    console.log(name, pass)
    const cai_gi_cung_duoc = new TeacherOperation()
    await cai_gi_cung_duoc.login(name, pass)
      .then(result => console.log(result))
      .catch(error => console.log(error))
    // const res = await staffsOperation.getAuthenticatedStaffInfo();
    // if (res.data) {
    //   setInfo(res.data);
    //   router.push("/dashboard")
    // }
  }




  const validate = (values: FormValues, type: number) => {
    var errors: string = "";
    // const NameRegex =/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/i;
    // const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/i;
    // const PhoneRegex = /^\d+$/;
    if (type == 1) {
      if (!values.name) {
        formErrors.nameEr = "Thiếu tên mất rồi.";
      }
      else formErrors.nameEr = "";
    }

    if (type == 2) {
      if (!values.pass) {
        formErrors.passEr = "Thiếu password nè";
      }
      else formErrors.passEr = "";
    }
    if (!formErrors.nameEr && !formErrors.passEr) { ; setshake(false); }
  };

  return (
    <>
      <div className="w-[calc(70%)] lg:w-[calc(25%)] bg-blue-900 h-[calc(350px)] lg:h-[calc(470px)] absolute transition-all transform
    rounded-xl rotate-12 animate-rotate-in-12deg"></div>
      <div className="w-[calc(70%)] lg:w-[calc(25%)] bg-blue-500 h-[calc(350px)] lg:h-[calc(470px)] absolute transition-all transform
    rounded-xl rotate-6 animate-rotate-in-6deg"></div>
      <div className="bg-white w-[calc(70%)] lg:w-[calc(25%)] h-[calc(350px)] lg:h-[calc(470px)] p-8 absolute rounded-xl shadow-xl">
        <div className="lg:pl-8">
          <LoginLangSelector />
        </div>
        <div className="selection:bg-blue-500 selection:text-white">
          <div className="flex justify-center items-center">
            <div className="lg:p-8 flex-1">
              <div className="mx-auto">
                <div className="text-center w-[calc(95%)]">
                  <h1 className="text-4xl lg:text-5xl lg:w-64 font-bold text-blue-900">
                    <FormattedMessage id="signup.welcomeboss.message" />
                  </h1>
                  <form className="mt-5 lg:mt-12" action="" method="POST">
                    <div className="mt-5 lg:mt-10 relative">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                        placeholder="john@doe.com"
                        onChange={(e) => handleName(e.target.value)}
                      />
                      <label
                        htmlFor="text"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm 
                    transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                    peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signup.username" />
                      </label>
                      <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.nameEr}</p>
                    </div>
                    <div className="mt-5 lg:mt-10 relative">
                      <input
                        type="password"
                        className=" peer h-10 w-full border-b-2  bg-transparent border-gray-300
                       text-gray-900
                       placeholder-transparent focus:outline-none focus:border-blue-600"
                        placeholder="Số điện thoại"
                        onChange={(e) => handlePass(e.target.value)}
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-5 text-gray-600 text-xs sm:text-sm transition-all 
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                      peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 
                      peer-focus:text-sm"
                      >
                        <FormattedMessage id="signup.password" />
                      </label>
                      <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.passEr}</p>
                      {/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
                    </div>
                  </form>
                  <div className="flex">
                    <button
                      onClick={signIn}
                      className={buttonstyle}
                    >
                      <FormattedMessage id="signup.verify" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
