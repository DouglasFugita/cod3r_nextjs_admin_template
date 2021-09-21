import { MoonIcon, SunIcon } from "../icons";

interface BotaoAlternarTemaProps {
    tema: string;
    alternarTema: () => void;
}

export default function BotaoAlternarTema(props: BotaoAlternarTemaProps) {
    return props.tema === 'dark' ?
        (
            <div onClick={props.alternarTema} className={`
                hidden
                sm:flex items-center justify-start  cursor-pointer
                bg-gradient-to-r from-yellow-300 to-yellow-600
                w-14 lg:w-24
                h-8
                p-1 rounded-full
            `}>
                <div className={`
                    flex items-center justify-center
                    bg-white text-yellow-600 w-5 h-5 rounded-full
                `}>
                    {SunIcon('h-4 w-4')}
                </div>
                <div className={`
                    hidden
                    lg:flex item-center ml-2
                    text-gray-100
                `}>
                    <span className={`text-sm`}>Claro</span>
                </div>
            </div>

        ) : (
            <div onClick={props.alternarTema} className={`
                hidden
                sm:flex items-center justify-end  cursor-pointer
                bg-gradient-to-r from-gray-500 to-gray-900
                w-14 lg:w-24
                h-8
                p-1 rounded-full
            `}>
                <div className={`
                    hidden
                    lg:flex item-center mr-3
                    text-gray-100
                `}>
                    <span className={`text-sm`}>Escuro</span>
                </div>
                <div className={`
                    flex items-center justify-center
                    bg-black text-yellow-300 w-5 h-5 rounded-full
                `}>
                    {MoonIcon('h-4 w-4')}
                </div>

            </div>

        )

}