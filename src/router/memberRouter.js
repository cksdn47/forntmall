import { Suspense, lazy } from "react";
import LogoutPage from "../pages/member/LogoutPage";

const Loading = <div>Loading.....</div>
const Login = lazy(  () => import("../pages/member/LoginPage"))

const memberRouter = () => {

    return[
        {
            path:"login",
            element:<Suspense fallback={Loading}><Login></Login></Suspense>
        },
        {
            path:"logout",
            element:<Suspense fallback={Loading}><LogoutPage></LogoutPage></Suspense>
        }
    ]
}

export default memberRouter;