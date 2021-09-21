import Image from 'next/image';
import router from 'next/router';
import loadingImg from '../../../public/images/loading.gif';
import useAuthData from '../../data/hook/useAuthData';
import Head from 'next/head';

export default function ForcarAutenticacao(props) {

    const {usuario, loading } = useAuthData()

    function renderizarConteudo(){
        return(
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes("admin-template-cod3r-auth")){
                                window.location.href = "/autenticacao";
                            }
                        `
                    }} />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando(){
        return(
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loadingImg} />
            </div>
        )
    }

    if(!loading && usuario?.email){
        return renderizarConteudo()
    } else if(loading) {
        return renderizarCarregando()
    } else{
        router.push('/autenticacao')
        return null
    }
    
}