'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export async function loginAction(prevState: any, formData: FormData) {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get("password")
        })
    }
    const response = await fetch('http://localhost:8000/login', config);
    if(response.ok) {
        const data = await response.json();
        setAuthData(data.token)
        redirect("/protected")
    } else {
        const data = await response.json();
        return {error: data.error}
    }

}

export async function logOutAction() {
    const coockiesStore = cookies();
    coockiesStore.delete("auth")
    redirect("/login")

}

export async function getToken() {
    const authData = await getAuthData();
    return authData?.token;
}

export async function getAuthData() {
    const cookiesStore = cookies()
    const auth = cookiesStore.get('auth')?.value;

    if (!auth) {
        return null
    }
    return JSON.parse(auth);
}

//TO-DO: implementar iron session esge seal unseal
export async function setAuthData(jwtToken: string) {
    const payloadBase64 = jwtToken.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const cookiesStore = cookies();
    cookiesStore.set("auth", JSON.stringify({
        token: jwtToken,
        payload
    }))
}