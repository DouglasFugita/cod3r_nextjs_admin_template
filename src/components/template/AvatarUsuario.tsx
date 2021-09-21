import Link from 'next/link';
import useAuthData from '../../data/hook/useAuthData';

interface AvatarUsuarioProps {

    className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const {usuario} = useAuthData()

    return(
        <Link href="/perfil">
            <img src={usuario?.imagemUrl ?? '/images/avatar.svg' } alt="Avatar do usuario" 
            className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`}/>
        </Link>
    )
}