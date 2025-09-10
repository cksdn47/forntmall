import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/products/ModifyComponent";

const ModifyPage    = () => {

    const {pno} = useParams()

    return(
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                수정 페이지
            </div>

            <ModifyComponent pno = {pno}></ModifyComponent>
        </div>
    )
}

export default ModifyPage;

