'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/context';
import styles from '../styles/Login.module.css';
import Image from 'next/image'
import logo from '../styles/images/logo.png';


const authentication = gql`
    query GetData($email: String!, $password: String!) {
        validateUser(email: $email, password: $password) {
            id
            role
        }
    }
`;

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [authenticate, {loading, data, error: queryError}] = useLazyQuery(authentication);
    const {setUserId, setRole} = useAppContext();
    const router = useRouter();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }

        if (password.length === 0) {
            setError('Por favor, insira a senha.');
            return;
        }

        setError('');

        authenticate({variables: {email, password}}).then((result) => {
            if (result.data.validateUser.id) {
                setUserId(result.data.validateUser.id);
                setRole(result.data.validateUser.role);
                router.push('/dashboard');
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className="w-full h-20 bg-purple-700 fixed top-0"></div>
            <div className="w-64 absolute top-20 left-0 m-5">
                <Image src={logo} alt="Logo" className="w-64"/>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col items-center">
                    <h2 className="text-purple-800 font-bold text-4xl mb-4 text-center">Faça Login</h2>
                    <div className={styles.loginBox}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <label htmlFor="email" className="mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="mb-4 p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <label htmlFor="password" className="mb-2">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="mb-4 p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <button type="submit"
                                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-blue-700">Entrar
                            </button>
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                            {loading && <p>Carregando...</p>}
                            {queryError && <p className="text-red-500 mt-4">Erro: {queryError.message}</p>}
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full h-20 bg-purple-700 fixed bottom-0"></div>
        </div>
    );
}