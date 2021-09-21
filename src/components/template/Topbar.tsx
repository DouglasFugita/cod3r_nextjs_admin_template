import useAppData from "../../data/hook/useAppData";
import AvatarUsuario from "./AvatarUsuario";
import BotaoAlternarTema from "./BotaoAlternarTema";
import Titulo from "./Titulo";

interface TopbarProps{
    titulo: string;
    subtitulo: string;
}

export default function Topbar(props: TopbarProps) {
    const ctx = useAppData()

    return(
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className={`flex flex-grow justify-end`}>
                <BotaoAlternarTema tema={ctx.tema} alternarTema={ctx.alternarTema} />
                <AvatarUsuario className="ml-3"/>
            </div>
        </div>
    )
}