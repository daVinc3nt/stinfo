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
    url: "/dashboard/elearning",
    icon: <AccountBox style={{ fontSize: 60 }} />,
  },
  {
    id: 1,
    title: "Thông tin sinh viên",
    url: "/dashboard/info",
    icon: <AccountBox style={{ fontSize: 60 }} />,
  },
  {
    id: 2,
    title: "Tiến trình học tập",
    url: "/dashboard/score",
    icon: <AccountBox style={{ fontSize: 60 }} />,
  },
  {
    id: 3,
    title: "Thời khoá biểu",
    url: "/dashboard/calendar",
    icon: <AccountBox style={{ fontSize: 60 }} />,
  },
];
export default function Service() {
  return (
    <>
      <div className="flex flex-col sm:flex-row overflow-x-hidden">
        {
          ItemData.map((item, index) => {
            return (
              <div key={index}>
                <Service_box icon={item.icon} title={item.title} url={item.url} />
              </div>
            )
          })
        }
      </div>
    </>
  );
}