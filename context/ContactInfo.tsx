export  const ContactInfo = () => {
    return (
        <div>
             <li className="flex items-center justify-center"> 
                        <script>ảnh căn cước mặt trước</script>
                        <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg" 
                           className="w-75 h-48" alt="" />
                            <script>ảnh căn cước mặt sau</script>
                        <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg" 
                           className="w-75 h-48" alt="" />  
            </li>
            <ul>
                        <p>Ngày tháng năm sinh</p>
                        <p>Giới tính</p>
                        <p>Nơi sinh</p>
                        <p>Hộ khẩu</p>
                        <p>CCCD/CMND</p>
            </ul>
            <div>
                    <h1 className="w-full h-1 rounded-lg bg-blue-200 p-5 flex items-center justify-center text-3xl">Thông tin liên lạc</h1>
                       <h2 className="space-y-9 ">
                        <p>Nơi ở hiện tại</p>
                        <p>Số điệnt thoại</p>
                        <h1>Người giám hộ</h1>
                        <p>Họ và tên</p>
                        <p>Số điện thoại</p>
                        <p>Mail</p>
                        <p>Địa chỉ liên lạc</p>
                        <p>Địa thường trú</p>
                       </h2>
                        
                </div>

        </div>
    )
}

export default ContactInfo