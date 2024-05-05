import React from "react";
import ColorTabs, { Page } from "@/components/MyBiography/ColorTabs";
import MainInfo from "@/components/MyBiography/content/MainInfo";
import ContactInfo from "@/components/MyBiography/content/ContactInfo";
import MedicalInfo from "@/components/MyBiography/content/MedicalInfo";
import FamilyInfo from "@/components/MyBiography/content/FamilyInfo";

const pages: Page[] = [
  { label: 'Trang chủ', component: MainInfo },
  { label: 'Liên lạc', component: ContactInfo },
  { label: 'Y tế', component: MedicalInfo },
  { label: 'Gia đình', component: FamilyInfo },
];

const Info: React.FC = () => {
  return (
    <>
      <div className="p-3 bg-gray-200 text-end text-2xl text-slate-700">Thông tin sinh viên</div>
      <div className="bg-white">
        <ColorTabs pages={pages} />
      </div>
    </>
  );
};

export default Info;
