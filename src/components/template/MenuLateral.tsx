import useAuthData from "../../data/hook/useAuthData";
import { BellIcon, ConfigIcon, HomeIcon, LogoutIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral(){

    const {logout} = useAuthData()

    return(
        <aside className={`
            flex flex-col
            bg-gray-200 
            dark:bg-gray-900 
        
        `}>
            <div className={`
            flex flex-col items-center justify-center
            bg-gradient-to-r from-indigo-500 to-purple-800
            h-20 w-32
            `}>
                <Logo />
            </div>

            <ul className={`
                flex-grow
            `}>
                <MenuItem url="/" texto="Home" icone={HomeIcon}/>
                <MenuItem url="/configuracoes" texto="Configuracoes" icone={ConfigIcon}/>
                <MenuItem url="/notificacoes" texto="Notificacoes" icone={BellIcon}/>
            </ul>

            <ul >
                <MenuItem texto="Logout" icone={LogoutIcon} onClick={logout} className={`
                    text-red-600 dark:text-red-400
                    hover:bg-red-400 hover:text-white dark:hover:text-gray-800
                `}/>
            </ul>            
        </aside>
    )
}