import Link from 'next/link'


const NavItem = () => {
    
    return (
       
        <nav className="flex w-full h-14 rounded-lg p-8 border-b bg-green-200 justify-between items-center text-3xl my-2 ">
            
            <ul className=" flex mx-4 my-2 space-x-14  ">
                <li className="flex mx-2 my-4 space-x-1 p-2 justify-center items-center cursor-pointer bg-blue-600 text-white">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.825" 
                    stroke="currentColor" 
                    className="w-6 h-6 inline">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                </svg>
                    <li className='active ? '>
                        Thong tin ca nhan
                    </li>
                </li>
                <li className="flex mx-2 my-4 space-x-1 p-2 justify-center items-center cursor-pointer bg-blue-600 text-white">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.825" 
                    stroke="currentColor" 
                    className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                <li className='active'>
                        <a href="/Thông tin y tế">Thông tin y tế</a>
                </li>
                
                    
                </li>
            </ul>
        </nav>
    )
}
export default NavItem 