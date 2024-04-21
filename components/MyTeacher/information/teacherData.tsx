

export interface Teacher {
    src: string;
    Name: string;
    TeacherID: string;
    BirthDay: string;
    Sex: boolean;   // True = nam (male), false = nữ (female)
    Position: string;
    Duty:     string;
    Phone: string;
    Email: string;
    Faculty: string;
    GroupID: string;
    Education: string;
    Achievement: string,
}


export const teacher: Teacher = {
    src: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
    Name: "Tran Thi Xuan Anh",
    TeacherID: "KH12032",
    BirthDay: "12221233",
    Sex: false,   // false = nữ (female)
    Position: "Giảng viên",  // Corrected "Position" spelling
    Duty: "Pho hoi",
    Phone: "dafsdfdsa",
    Email: "dsafasdfsdafsd",
    Faculty: "Cong nghiep",
    GroupID: "dsafsdfsd",
    Education: "Tiến sĩ",
    Achievement: "MIT",
};
