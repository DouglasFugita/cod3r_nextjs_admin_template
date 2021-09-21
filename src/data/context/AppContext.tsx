import { createContext, useEffect, useState } from "react";

interface AppContextProps{
    tema?: string;
    children?: any;

    alternarTema?: () => void;
}

const AppContext = createContext<AppContextProps>({
    tema: null,
    alternarTema: null
});

export function AppProvider(props: AppContextProps) {
    const [tema, setTema] = useState('');

    function alternarTema(){
        const novoTema = tema === "dark" ? "" : "dark"
        setTema(novoTema);
        localStorage.setItem("tema", novoTema);
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema');
        if(temaSalvo){
            setTema(temaSalvo);
        }
    }, [])

    return(
        <AppContext.Provider value={{
            tema: tema,
            alternarTema: alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    ) 
}

export default AppContext;
