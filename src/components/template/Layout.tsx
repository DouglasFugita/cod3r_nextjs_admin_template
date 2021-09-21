import useAppData from "../../data/hook/useAppData"
// import ForcarAutenticacao from "../auth/ForcarAutenticacao"
import forcarAutenticacao from "../../functions/forcarAutenticacao"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"
import Topbar from "./Topbar"


interface LayoutProps {
    titulo: string;
    subtitulo: string;
    children?: any
}

export default function Layout(props: LayoutProps) {
    const ctx = useAppData()

    return forcarAutenticacao(
       // <ForcarAutenticacao>
            <div className={`${ctx.tema} flex h-screen w-screen`}>
                <MenuLateral />
                <div className={`
                    flex flex-col p-7 w-full 
                    bg-gray-300 dark:bg-gray-800`}>
                    <Topbar titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
            </div>
      //  </ForcarAutenticacao>
    )
}