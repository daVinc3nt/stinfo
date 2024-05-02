import { TeacherOperation, token } from "@/ambLib/amb";


export interface Teacher {
    src: string;
    Name: string;
    Sex: boolean;   // True = nam (male), false = nữ (female)
    BirthDay: string;
    TeacherID: string;
    Email: string;
    Phone: string;
    Address: string;
    Class: string;
    Degree: string;
    Faculty: string;
    Major: string;
    Subject: string[];
}
  

export const teacherData = async (token: token) => {
    const {Name,Sex, } = teacher
    try {
       
        const fetchTeacherInfo = new TeacherOperation();
        const response = await fetchTeacherInfo.findByTeacher(token);
        
        if (!response.error && response.data) {
            const {
                Name,
                Sex,
                BirthDay,
                TeacherID,
                Email,
                Phone,
                Address,
                Class,
                Degree,
                Falculty, 
                Major,
                Subject
            } = response.data;

            // Gán thông tin vào biến teacher
            teacher.Name = Name;
            teacher.Sex = Sex;
            teacher.BirthDay = BirthDay;
            teacher.TeacherID = TeacherID;
            teacher.Email = Email;
            teacher.Phone = Phone;
            teacher.Address = Address;
            teacher.Class = Class;
            teacher.Degree = Degree;
            teacher.Faculty = Falculty; // Chú ý sửa lại thành Faculty
            teacher.Major = Major;
            teacher.Subject = Subject;
        } else {
            console.error('Error fetching teacher data:', response.error);
        }
    } catch (error) {
        console.error('Error fetching teacher data:', error);
    }
}

// Gọi hàm để lấy dữ liệu giáo viên
//teacherData();

// Khai báo biến teacher giống như trong mã của bạn
/*export const teacher: Teacher = {
    src: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
    Name: "Tran Thi Xuan Anh",
    TeacherID: "KH12032",
    BirthDay: "12221233",
    Sex: false,   // false = nữ (female)
   // Position: "Giảng viên",
    //Duty: "Pho hoi",
    Phone: "dafsdfdsa",
    Email: "dsafasdfsdafsd",
    Faculty: "Cong nghiep",
    Address: "Nguyen Thi Minh Khai",
    Class: "L03",
    Degree:"Tien si",
    Major: "dafdsafsaf",
    Subject : [
        'đâs','đâsd',
    ]

    
};


*/