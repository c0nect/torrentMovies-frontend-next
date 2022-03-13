import Router from 'next/router'
import jwt_decode from "jwt-decode";
import { createContext, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies'
import { useState } from "react";
import { apiUrl } from '../services/api';

type User = {
    name: string;
    email: string;
    image_url: string;
}

type SignInData = {
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'jwt': token } = parseCookies()

        // logged
        if (token) {
            var decodedToken = jwt_decode(token)
            var id = decodedToken['sub']

            recoverUserInformationById(id).then(response => {
                setUser(response)
            }).catch(error => {
                console.log(error)
            })
        }

        // console.log("q");
    }, [])

    async function signIn({ email, password }: SignInData) {
        apiUrl.post(`/login/`, { email, password })
            .then(response => {
                const data = response
                // console.log(data)
                setCookie(undefined, 'jwt', data.data.token, {
                    maxAge: 60 * 60 * 1, // 1 hour
                })

                apiUrl.defaults.headers['Authorization'] = `Bearer ${data.data.token}`
                setUser(data.data.user)
                Router.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
            })

        // const { token , user } = await fetch('http://localhost:3000/api/v1/login/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },

        //     body: JSON.stringify({ email, password })
        // }).then(res => res.json())

        // setCookie(undefined, 'jwt', token, {
        //     maxAge: 60 * 60 * 1, // 1 hour
        // })


        // apiUrl.defaults.headers['Authorization'] = `Bearer ${token}`

        // setUser(user)
        // Router.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

// export async function recoverUserInformationByEmail(email: string) {
//     await apiUrl.get(`/user/${email}`)
//     .then(response => {
//         return response.data
//     })
//     .catch(error => {
//         console.log(error)
//     })
// }

export async function recoverUserInformationById(id: string) {
    const { user } = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

    // console.log('ok to logado:', user)
    return user
}