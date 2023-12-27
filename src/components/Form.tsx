'use client'

import { PropsWithChildren } from "react";
import { useFormState } from "react-dom";

type HTMLFormProps = React.DetailedHTMLProps<
React.HTMLAttributes<HTMLFormElement>, HTMLFormElement>;

type FormProps = PropsWithChildren<Omit<HTMLFormProps, "action"> & { action: (prevState: any, formData: FormData) => Promise<any> }>

export default function Form(props: FormProps) {
    const [state, formAction] = useFormState(props.action, {error: null})
    return (
        <form {...props} action={formAction}>
            {state.error && <div className=" bg-red-500 text-white p-2 rounded w-full">{state.error}</div>}
            {props.children}
        </form>
    )
}