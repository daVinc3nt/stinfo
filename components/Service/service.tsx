import {
    ReceiptLong,
    Inventory,
    Assistant,
    People,
    PieChart,
    PendingActions,
    LocalShipping,
    BusinessCenter,
    AlternateEmail,
    Folder,
    MapsHomeWork,
    LogoutOutlined,
    Handshake,
    AccountBox,
  } from "@mui/icons-material";
import { Service_box } from "../Common/box";
  
const ItemData = [
    {
      id: 0,
      title: "E-learning",
      url: "/",
      icon: <AccountBox style={{ fontSize: 60 }}/>,
    },
    {
        id: 1,
        title: "Thông tin sinh viên",
        url: "/",
        icon: <AccountBox style={{ fontSize: 60 }}/>,
      },
    {
      id: 2,
      title: "Tiến trình học tập",
      url: "/",
      icon: <AccountBox style={{ fontSize: 60 }}/>,
    },
    {
      id: 3,
      title: "Thời khoá biểu",
      url: "/",
      icon: <AccountBox style={{ fontSize: 60 }}/>,
    },
 ];
 export default function Service() {
    return (
        <>
        {
            ItemData.map((item) => {
                return (
                    <Service_box icon={item.icon} title={item.title} url={item.url}/>
                )
            })
        }
        </>
    );
  }