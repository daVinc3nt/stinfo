{/*
return (

    for (let i = 0, j = 0, ss = ""; i < DATA.length; i++) {
            ss = DATA[i].semester
            j = map[ss]
            DATA[i].semester = "Học kỳ " + ss[4] + " Năm học 20" + ss[2] + ss[3] + " - "
                + (ss[3] == '9' ? (parseInt(ss[2], 10) + 1).toString + '0' : ss[2] + (parseInt(ss[3], 10) + 1).toString)
            semester[j].push(DATA[i])
        }
        setStudent(student)
        setSemes(semester)
        console.log(semester)

    <>
            <div className="flex mt-2 justify-center text-xl">Bảng điểm sinh viên</div>
            <div className=" flex flex-row mx-2  md:text-base sm:text-sm text-xs">
                <div className="flex-1 my-4  flex flex-col" >
                    <div className={`flex flex-col bg-blue-200 p-2 border border-spacing-1 rounded-lg shadow-lg h-144 `}>
                        <div className="flex justify-between ">
                            <div>Họ và Tên: ANH LONG ANH LONG 24270958</div>
                            <div className="hidden xl:block">{DATE.getDate() + '/' + DATE.getMonth() + '/' + DATE.getFullYear()}</div>
                        </div>
                        <div>Điểm trung bình tích luỹ</div>
                        <div>Số tín chỉ tích luỹ</div>
                        {setIsloading && <label className="flex items-center">
                            <p className=" mr-1">Chọn kết quả học kỳ:</p>
                            <select className=" bg-gray-200 w-50 rounded-xl hover:bg-gray-300  "
                                value={cursemes}
                                onChange={(e) => { setCursemes(e.target.value) }}
                            >
                                <option value="Tất cả">Tất cả</option>
                                {
                                    semes.map((item) => {
                                        return (
                                            <option value={item[0].semester}>{item[0].semester}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                        }
                        {setIsloading && <div className="overflow-auto mt-10 flex flex-col ">
                            {semes.map((item, index) => {
                                const key = { index };
                                if (item[0].semester == cursemes || cursemes == "Tất cả")
                                    return (
                                        <div className=" animate-fade-down flex flex-col" key={index}>
                                            <div className="bg-gray-300 border-2  rounded-xl text-center w-64">{item[0].semester}</div>
                                            <table className="  table-fixed flex-1 mt-4 mb-20">
                                                <thead>
                                                    <tr className=" border-t-2 border-b-2">
                                                        <th>Mã môn học</th>
                                                        <th>Tên môn học </th>
                                                        <th>Số tín chỉ</th>
                                                        <th>Điểm thành phần</th>
                                                        <th>Điểm trung bình</th>
                                                        <th>Thống kê môn học</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {item.map((item) => {
                                                        return (
                                                            <tr className=" text-center">
                                                                <td>{item.course_id}</td>
                                                                <td>{item.course_name}</td>
                                                                <td>{item.credits}</td>
                                                                <td>BT:{item.exercise},LAB:{item.lab},GK:{item.midterm},CK:{item.final}</td>
                                                                <td>{item.GPA}</td>
                                                                <td className="flex justify-center items-center">
                                                                    <button className="relative flex items-center justify-center w-14 h-5 bg-purple-400 border rounded-lg hover:bg-purple-500"
                                                                        onClick={() => { if (show) setShow(0); else setShow(1) }}>
                                                                        <Image
                                                                            src="/statistic.png"
                                                                            width={15}
                                                                            height={20}
                                                                            alt="Picture of the author"
                                                                        />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                            })
                            }
                        </div>}
                    </div>
                </div>
                <div className={`${!show ? 'w-0' : ' w-1/3 mt-4 ml-2 '} flex flex-col transition-width h-144`}>
                    <PieChart animation={`${!show ? 'hidden' : ' animate-delay-[500ms] animate-fade animate-duration-700'}`} percentages={percentages}></PieChart>
                    <div className={`border rounded-lg shadow-lg ${!show ? 'hidden' : 'mt-2 animate-delay-[500ms] rounded-lg animate-fade animate-duration-700 flex flex-col bg-blue-200'}`}>
                        <div className="text-center my-2">Tiến độ học tập</div>
                        <div className="flex-1 m-2">
                            <div className="grid grid-cols-3 gap-5">
                                <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center ">
                                    <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm  flex items-center justify-center mb-1">128</dt>
                                    <dd className="text-orange-600  text-center">Tổng tín chỉ</dd>
                                </dl>
                                <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center">
                                    <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm  flex items-center justify-center mb-1">15</dt>
                                    <dd className="text-teal-600 text-center">Số tín chỉ đang học</dd>
                                </dl>
                                <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center ">
                                    <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm  flex items-center justify-center mb-1">50</dt>
                                    <dd className="inline-flex text-blue-600  text-center">Số tín chỉ đã hoàn thành</dd>
                                </dl>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mb-4 px-2">


                <div className="flex flex-col  bg-blue-200 border rounded-lg shadow-lg ">
                    <div className=" text-center mt-2">Điểm trung bình học kỳ</div>
                    <div className="mx-2 my-10 flex-1 flex flex-row ">

                        <div className=" flex flex-col-reverse w-10 mr-3" style={{ height: 320 }}>
                            {
                                level.map((item) => {
                                    return (
                                        <div className="relative flex-1 justify-end "><div className="absolute right-0 -top-3">{item}</div></div>
                                    )
                                })
                            }
                        </div>
                        <div className="relative flex-1 flex mr-3">
                            <div className="absolute inset-0 flex-1 flex flex-row z-30" >

                                {
                                    score.map((item, index) => {

                                        return (
                                            <div className="relative flex-1 flex justify-center px-2">
                                                <div id={`${index}`} className="absolute bottom-0 w-4  rounded-t-xl bg-red-300 hover:bg-red-500" style={{ height: (item / 4) * 320 }}>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="absolute inset-0 flex flex-col z-20">
                                {
                                    score.map((item) => {
                                        return (
                                            <div className=" border-t-2 border-slate-400 flex-1"></div>
                                        )
                                    })
                                }
                            </div>
                            <div className="absolute h-0.5 bg-slate-400 bottom-0 inset-x-0"></div>
                        </div>
                    </div>
                </div>

            </div>
            {isMouseInside &&
                <div className="rounded-lg p-2 z-50 bg-slate-300" style={{ position: "fixed", left: position.x, top: position.y - 40 }}>{curAv}</div>}
        </>
        */}