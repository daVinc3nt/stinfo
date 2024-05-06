import CouresInfo from "@/components/MyCourses/MyClass/CouresInfo"
import { useRouter } from "next/router";



const class_info = () => {
    const router = useRouter();
    const { class_id } = router.query;
    return (
        <div>
            <CouresInfo class_id={String(class_id)}/>
        </div>
    )
}

export default class_info