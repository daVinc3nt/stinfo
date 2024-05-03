export interface CustomLink {
  Label:  string;
  Link:   string;
}

export interface Course {
    src: string;
    SubjectName: string;
    SubjectLink: CustomLink;
    Faculty: string;
    Active: boolean;
}



export const coursesData: Course[] = [
    {
        src: 'https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg',
        SubjectName: 'Toán học',
        SubjectLink: {
          Label: 'Toan hoc va nhung nguoi ban',
          Link: './class_info',
        },
        Faculty: 'Khoa may tinh',
        Active: true,
      },
      {
        src: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
        SubjectName: 'Dien tu',
        SubjectLink: {
          Label: 'Toan hoc va nhung nguoi ban',
          Link: 'https://example.com/toan-hoc',
        },
        Faculty: 'Khoa co khi',
        Active: true,
      },
      {
        src: 'https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg',
        SubjectName: 'Sac the di truyen',
        SubjectLink: {
          Label: 'Toan hoc va nhung nguoi ban',
          Link: 'https://example.com/toan-hoc',
        },
        Faculty: 'Khoa phu',
        Active: true,
      },
      {
        src: 'https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg',
        SubjectName: 'Mang noron',
        SubjectLink: {
          Label: 'Toan hoc va nhung nguoi ban',
          Link: 'https://example.com/toan-hoc',
        },
        Faculty: 'Khoa than kinh',
        Active: true,
      },
      {
        src: 'https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg',
        SubjectName: 'WTF',
        SubjectLink: {
          Label: 'Toan hoc va nhung nguoi ban',
          Link: 'https://example.com/toan-hoc',
        },
        Faculty: 'Khoa det may',
        Active: false,
      },
      {
        src: 'https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg',
        SubjectName: 'Khoa học',
        SubjectLink: {
          Label: 'Toan hoc va nhung nguoi ban',
          Link: 'https://example.com/toan-hoc',
        },
        Faculty: 'Jane Doe',
        Active: false,
      },
      // Thêm các đối tượng khác
];
