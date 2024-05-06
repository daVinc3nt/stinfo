
import MyClass from "@/components/MyCourses/MyClass/content/MyClass";
import { useRouter } from "next/router";



const class_info = () => {
    const router = useRouter();
    const { class_id } = router.query;
    return (
        <div>
            <MyClass ClassID={String(class_id)}/>
        </div>
    )
}

export default class_info