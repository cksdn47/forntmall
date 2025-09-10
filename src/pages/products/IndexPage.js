import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {

    const navigete = useNavigate()

    const handleClickList = useCallback(  ()=> {
        navigete({
            pathname:'list'
        })
    })

    const handleClickAdd = useCallback(  () => {
        navigete({
            pathname:'add'
        })
    })
    return(
        <BasicLayout>
            <div className="text-black font-extrabold -mt-10">
                    Products Menu
            </div>

            <div className="w-full flex m-2 p-2">

                <div className="text-xl m-1 p-1 w-20 font-extrabold text-center underline"
               onClick={handleClickList}>
                    LIST
                </div>
                <div className="text-xl m-1 p-1 w-20 font-extrabold text-center underline"
                onClick={handleClickAdd}>
                    ADD
                </div>
            </div>
            <div className="flex flex-wrap w-full">
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    )
}


export default IndexPage;