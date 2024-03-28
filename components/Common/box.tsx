import Link from "next/link";

interface MenuItem {
    title: string;
    url: string;
    icon: JSX.Element;
}
export function Service_box(menuItems: MenuItem) {
    return (
        <Link href={menuItems.url}>
            <div className=" flex flex-col max-w-4xl justify-center p-4 mt-4">
                <div className="group rounded-lg w-full bg-blue-900 p-22 text-black transition 
            duration-400 ease-in-out hover:cursor-pointer hover:scale-110 p-10"
                >
                    <i className="h-48">
                        {menuItems.icon}
                    </i>
                    <div className="text-white text-2xl font-bold uppercase group-hover:text-yellow-300">
                        <h1 className="service__text">{menuItems.title}</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}