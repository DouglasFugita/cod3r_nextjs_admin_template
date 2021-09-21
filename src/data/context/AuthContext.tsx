import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import Usuario from '../../models/Usuario'
import route from 'next/router'
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
    loginEmail?: (email: string, senha: string) => Promise<void>
    cadastrarEmail?: (email: string, senha: string) => Promise<void>
    logout?: () => Promise<void>
    loading?: boolean

}

const AuthContext = createContext<AuthContextProps>({})

export default AuthContext

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    console.log(usuarioFirebase);
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token: token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL,
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-cod3r-auth', logado.valueOf, { expires: 7 })
    } else {
        Cookies.remove('admin-template-cod3r-auth')
    }


}

export function AuthProvider(props) {
    const [loading, setLoading] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    async function configurarSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setLoading(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setLoading(false)
            return false
        }
    }

    async function loginEmail(email, senha) {
        try {
            setLoading(true)
            const result = await firebase.auth().signInWithEmailAndPassword(email, senha)

            await configurarSessao(result.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function cadastrarEmail(email, senha) {
        try {
            setLoading(true)
            const result = await firebase.auth().createUserWithEmailAndPassword(email, senha)

            await configurarSessao(result.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const provider = new firebase.auth.GoogleAuthProvider()
            const result = await firebase.auth().signInWithPopup(provider)

            await configurarSessao(result.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configurarSessao(null)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-cod3r-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setLoading(false)
        }

    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            logout,
            loading,
            loginEmail,
            cadastrarEmail
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

