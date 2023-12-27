import { getAuthData, logOutAction } from "@/actions/auth"
import Form from "./Form"

export default async function Navbar() {
    const authData = await getAuthData()
    return(
        <nav className=" bg-gray-800">
            {authData && (
                <div className="text-white flex flex-row items-center p-2">
                    <span className=" text-xl font-semibold">
                        Olá {authData.payload.username}
                    </span>
                    <Form action={logOutAction}>
                        <button className=" text-white ml-2">Sair</button>
                    </Form>
                </div>
            )}
        </nav>
    )
}