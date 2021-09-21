import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { WarningIcon } from "../components/icons";
import useAuthData from "../data/hook/useAuthData";

export default function Autenticacao() {

    const {usuario, loginGoogle, loginEmail, cadastrarEmail} = useAuthData()

    const [modo, setModo] = useState<'login' | 'cadastro'>("login");
    const [erro, setErro] = useState(null);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function exibirErro(msg, tempo = 5000){
        setErro(msg);
        setTimeout(() => setErro(null), tempo);
    }

    async function handleSubmit() {
        try{
            if (modo === "login") {
                await loginEmail(email, senha);
            } else {
                await cadastrarEmail(email, senha);
            }
        } catch(e) {
            exibirErro(e?.message ?? "Erro desconhecido");
        }
    }

    return (
        <div className={`flex h-screen items-center justify-center`}>
            <div className={`
                hidden
                md:block 
                md:w-1/2
                lg:w-2/3
            `}>
                <img src="https://source.unsplash.com/random" alt="Autenticacao" className={`h-screen w-full object-cover`} />
            </div>

            <div className={`
                m-10 
                w-full
                md:w-1/2
                lg:w-1/3`}>
                <h1 className={`font-bold mb-5 text-3xl`}>
                    {modo === 'login' ? 'Entra com a sua conta' : 'Cadastre-se na plataforma'}
                </h1>

                {erro && (
                <div className={`flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg`}> 
                    {WarningIcon()}
                    <span className="ml-3">{erro}</span>
                </div>)
                }

                <AuthInput label="Email" valor={email} tipo="email" onChange={setEmail} obrigatorio />
                <AuthInput label="Senha" valor={senha} tipo="password" onChange={setSenha} obrigatorio />

                <button onClick={handleSubmit} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg py-3 px-4 mt-6
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={loginGoogle} className={`
                    w-full bg-red-500 hover:bg-red-400 text-white rounded-lg py-3 px-4
                `}>
                    Entrar com Google
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Crie uma conta gratuitamente</a></p>
                ) : (
                    <p className="mt-8">
                        Ja faz parte da nossa plataforma?
                        <a onClick={() => setModo('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Entre com suas credenciais</a></p>
                )}
            </div>
        </div>
    )
}