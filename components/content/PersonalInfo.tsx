

export  const PersonalInfo = () => {
    return (
        <div className="px-4 pt-1 mt-3 space-y-4 "> 
             <div className="flex items-center justify-center space-x-2 "> 
                        <script>ảnh căn cước mặt trước</script>
                        <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg" 
                           className="w-63 h-40" alt="" />
                            <script>ảnh căn cước mặt sau</script>
                        <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg" 
                           className="w-63 h-40" alt="" />  
            </div>
            <div className="block item-center justify-start space-y-4">

                        <p>Nơi sinh</p>
                        <p>Hộ khẩu thường trú</p>   
                        <p>CCCD/CMND</p>
            </div>
            <div >
                    <div className="w-full h-1 rounded-lg bg-blue-200 p-5 flex items-center justify-center text-xl  md:text-3xl">Thông tin gia đình</div>
                       <div className=" grid grid-cols-2 m-2 space-x-1 ">
                            <div className="justify-start items-center col-span-1  text-white bg-black space-y-6 rounded-lg shadow-md p-1">
                            <p>Họ tên cha: Trần Hoàng Minh Đế</p>
                            <p>SĐT/Email</p>
                            <p>Nghề nghiệp</p>
                            <p>Nơi công tác</p>
                            </div>
                            <div className="justify-start items-center col-span-1  text-black bg-white space-y-6 rounded-lg shadow-md p-1">
                            <p>Họ tên Mẹ: Vũ Kim Thiên Hoàng Minh</p>
                            <p>SĐT/Email</p>
                            <p>Nghề nghiệp</p>
                            <p>Nơi công tác</p>    
                            </div>  
                       </div>
                        
                </div>

        </div>
    )
}

export default PersonalInfo