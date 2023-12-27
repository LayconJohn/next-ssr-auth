import { loginAction } from "@/actions/auth";
import Form from "@/components/Form";
import Submit from "@/components/Submit";

export default function LoginPage() {
    return (
        <div className="m-2 ">
            <div className=" bg-white p-8 rounded shadow w-96">
                <h2 className="text-2xl mb-4 text-black">Login</h2>
                <Form action={loginAction}>
                    <div>
                        <label className="block text-sm text-gray-600">Usuário</label>
                        <input 
                            type="username"
                            name="username"
                            className=" w-full p-2 border rounded shadow mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Senha</label>
                        <input 
                            type="password"
                            name="password"
                            className=" w-full p-2 border rounded shadow mt-1"
                        />
                    </div>
                    <div>
                        <Submit 
                        type="submit" 
                        className="bg-blue-600 text-white p-2 rounded w-full mt-5"
                        
                        >
                            Entrar
                        </Submit>
                    </div>
                </Form>
            </div>
        </div>
    )
}