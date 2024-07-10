'use client';

import { useAppContext } from '@/lib/context';
import { useRouter } from 'next/navigation';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import logo from '../styles/images/logo.png';
import clock from '../styles/images/clock.png'
import Image from "next/image";
import { format } from 'date-fns';


const DASHBOARD_USER = gql`
    query getData($userId: Float!, $orderBy: String!) {
        getUserByID(id: $userId, orderBy: $orderBy) {
            id
            name
            registeredTimes {
                time_registered
            }
        }
    }
`;

const DASHBOARD_ADMIN = gql`
    query getData($orderBy: String!) {
        getAllUsersWithTimes(orderBy: $orderBy) {
            id
            name
            registeredTimes {
                time_registered
            }
        }
    }
`;

const REGISTER_CLOCK = gql`
    mutation RegisterClock($userId: Float!) {
        registerClock(data: { user_id: $userId }) {
            id
            user_id
            time_registered
        }
    }
`;

interface UserWithTimes {
    id: number;
    name: string;
    registeredTimes: { time_registered: string }[];
}

export default function Dashboard() {
    const { userId, role } = useAppContext();
    const router = useRouter();
    const [error, setError] = useState('');
    const [adminData, setAdminData] = useState<UserWithTimes[] | null>(null);
    const [userData, setUserData] = useState<UserWithTimes | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [generateAdminDashboard] = useLazyQuery(DASHBOARD_ADMIN, {
        onCompleted: (data) => setAdminData(data.getAllUsersWithTimes),
        onError: (error) => setError(error.message),
    });

    const [generateUserDashboard] = useLazyQuery(DASHBOARD_USER, {
        onCompleted: (data) => setUserData(data.getUserByID),
        onError: (error) => setError(error.message),
    });

    const [registerClock] = useMutation(REGISTER_CLOCK, {
        onCompleted: () => {
            setIsModalOpen(false);
            if (role === 'user') {
                generateUserDashboard({ variables: { userId: parseFloat(userId!.toString()), orderBy: 'DESC' } });
            } else {
                generateAdminDashboard({ variables: { orderBy: 'DESC' } });
            }
        },
        onError: (error) => setError(error.message),
    });

    useEffect(() => {
        if (userId === null || userId === undefined) {
            router.push('/login');
        } else {
            const numericUserId = parseFloat(userId.toString());
            if (role === 'user') {
                generateUserDashboard({ variables: { userId: numericUserId, orderBy: 'DESC' } });
            } else if (role === 'admin') {
                generateAdminDashboard({ variables: { orderBy: 'DESC' } });
            }
        }
    }, [userId, role, generateUserDashboard, generateAdminDashboard, router]);

    const handleRegisterClock = () => {
        if (userId !== null) {
            registerClock({ variables: { userId: parseFloat(userId.toString()) } });
        }
    };

    if (!userId) {
        return <p>Loading...</p>;
    }

    // @ts-ignore
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    // @ts-ignore
    const formatTime = (dateString) => {
        return format(new Date(dateString), 'HH:mm:ss');
    };

    const getCurrentDate = () => {
        return format(new Date(), 'dd/MM/yyyy');
    };

    const getCurrentTime = () => {
        return format(new Date(), 'HH:mm');
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="top-0 left-0 ">
                    <Image src={logo} alt="Logo" className="w-40"/>
                </div>
                {role === 'user' && userData && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-700 text-white font-bold py-2 px-4 rounded mr-10"
                    >
                        Registrar ponto
                    </button>
                )}
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {error && <p className="text-red-500">{error}</p>}
                {role === 'user' && userData ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 mt-4 mr-16 text-center">Meus registros</h2>
                        <div className="flex justify-between items-center font-bold">
                            <p className="ml-4">Colaborador</p>
                            <p className="flex-grow text-center mr-12">Data</p>
                            <p className="mr-20">Horário</p>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {userData.registeredTimes.map((time, index) => (
                                <li key={index} className="flex justify-between items-center py-4">
                                    <div className="relative ml-4">
                                        <p className="font-semibold">{userData.name}</p>
                                        <p className="text-sm text-gray-500 absolute left-1/2 transform -translate-x-1/2">{userData.id}</p>
                                    </div>
                                    <p>{formatDate(time.time_registered)}</p>
                                    <p className="relative mr-20">{formatTime(time.time_registered)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : role === 'admin' && adminData ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Registros de todos os usuários</h2>
                        <div className="flex justify-between items-center font-bold">
                            <p className="ml-4">Colaborador</p>
                            <p className="flex-grow text-center mr-12">Data</p>
                            <p className="mr-20">Horário</p>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {adminData.map((user) => (
                                <li key={user.id} className="py-4">
                                    <div className="relative ml-4">
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-gray-500 ml-4">{user.id}</p>
                                    </div>
                                    <ul className="divide-y divide-gray-200 mt-2">
                                        {user.registeredTimes.map((time, index) => (
                                            <li key={index} className="flex justify-between items-center py-4">
                                                <p className="ml-20 flex-grow text-center">{formatDate(time.time_registered)}</p>
                                                <p className="mr-20">{formatTime(time.time_registered)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <span
                className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>

                        <h2 className="text-xl font-bold mb-4">Registrar novo ponto</h2>
                        <div className="flex flex-col items-center">
                            <div className="text-5xl text-purple-700 mb-4">
                            <i className="fas fa-clock"></i>
                            </div>
                            <Image src={clock} alt="Clock" className="w-40"/>
                            <p className="text-2xl mt-3" >{getCurrentTime()}</p>
                            <p className="text-gray-500 mb-4">{getCurrentDate()}</p>
                            <button
                                onClick={handleRegisterClock}
                                className="bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2"
                            >
                                Bater ponto
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="border border-purple-700 text-purple-700 font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
