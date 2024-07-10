'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../styles/images/logo-w.png';
import brainny from '../styles/images/brainny.png';
import amopet from '../styles/images/amopet.png';
import bus from '../styles/images/bus.png';
import gostudy from '../styles/images/gostudy.png';
import mascote from '../styles/images/mascote.png';
import facebook from '../styles/images/facebook.png';
import instagram from '../styles/images/instagram.png';
import linkedin from '../styles/images/linkedin.png';


const plans = [
    { title: 'Plano Bronze', price: 'R$ 30', details: ['Uso até 5 colaboradores', 'Área de meus registros', 'Dashboard', 'Acesso de Colaboradores', 'Suporte exclusivo', 'Email corporativo'] },
    { title: 'Plano Prata', price: 'R$ 50', details: ['Uso até 10 colaboradores', 'Área de meus registros', 'Dashboard', 'Acesso de Colaboradores', 'Suporte exclusivo', 'Email corporativo'] },
    { title: 'Plano Ouro', price: 'R$ 100', details: ['Uso até 20 colaboradores', 'Área de meus registros', 'Dashboard', 'Acesso de Colaboradores', 'Suporte exclusivo', 'Email corporativo'] },
    { title: 'Plano Platina', price: 'R$ 200', details: ['Acessos Ilimitados', 'Área de meus registros', 'Dashboard', 'Acessos Ilimitados', 'Suporte exclusivo', 'Email corporativo'] }
];

export default function LandingPage() {
    const [currentPlan, setCurrentPlan] = useState(1);
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };

    const handlePrevClick = () => {
        setCurrentPlan((prevPlan) => (prevPlan - 1 + plans.length) % plans.length);
    };

    const handleNextClick = () => {
        setCurrentPlan((prevPlan) => (prevPlan + 1) % plans.length);
    };

    return (
        <div className="min-h-screen bg-purple-900 text-white">

            <header className="flex justify-between items-center p-6">
                <div className="w-40">
                    <Image src={logo} alt="PontoGo Logo" />
                </div>
                <button
                    onClick={handleLoginClick}
                    className="bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Fazer login
                </button>
            </header>


            <main className="flex items-center justify-between text-left mt-12 px-12">
                <div className="flex flex-col justify-center max-w-lg">
                    <h1 className="text-4xl font-bold mb-4">ESQUECE O PONTO MANUAL</h1>
                    <h2 className="text-2xl font-semibold mb-8">Chegou a nova realidade para Controle de Pontos</h2>
                    <p className="text-lg mb-6">
                        Com o PontoGo seus colaboradores poderão bater seus pontos de forma fácil e rápida, possuindo também uma Dashboard intuitiva.
                    </p>
                    <div className="flex space-x-4 mb-12">
                        <button className="bg-purple-700 text-white font-bold py-2 px-4 rounded">Assinar agora</button>
                        <button className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded">Ver planos</button>
                    </div>
                </div>
                <div className="w-1/2">
                    <Image src={mascote} alt="Mascote Engracadinho" className="w-full" />
                </div>
            </main>


            <div className="flex justify-center space-x-8 mb-12">
                <div className="w-24">
                    <Image src={brainny} alt="Brainny Logo" />
                </div>
                <div className="w-24">
                    <Image src={amopet} alt="AmoPet Logo" />
                </div>
                <div className="w-24">
                    <Image src={bus} alt=".Bus Logo" />
                </div>
                <div className="w-24">
                    <Image src={gostudy} alt="GoStudy Logo" />
                </div>
            </div>

            <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-bold mb-4">Encontre o plano perfeito</h3>
                <p className="text-lg mb-12 max-w-2xl">
                    Escolha o plano que melhor se encaixa na sua empresa e faça sua assinatura, dentro de 72h iremos liberar seus acessos.
                </p>


                <div className="relative w-full flex justify-center items-center">
                    <button onClick={handlePrevClick} className="absolute left-0 p-2 bg-purple-700 rounded-full">{'<'}</button>
                    <div className="flex space-x-8 overflow-hidden w-full justify-center items-center">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white text-purple-900 rounded-lg p-6 shadow-lg transition-transform transform ${
                                    index === currentPlan ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
                                }`}
                                style={{ transition: 'all 0.3s ease-in-out' }}
                            >
                                <h4 className="text-2xl font-bold mb-4">{plan.title}</h4>
                                <p className="text-xl mb-4">{plan.price}</p>
                                <ul className="text-left mb-4">
                                    {plan.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNextClick} className="absolute right-0 p-2 bg-purple-700 rounded-full">{'>'}</button>
                </div>
            </div>



            <footer className="bg-purple-800 text-center py-6">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://instagram.com" className="text-white w-10"><Image src={instagram} alt="Instagram Logo" /></a>
                    <a href="https://facebook.com" className="text-white w-10"><Image src={facebook} alt="Facebook Logo" /></a>
                    <a href="https://linkedin.com" className="text-white w-10"><Image src={linkedin} alt="Linkedin Logo" /></a>
                </div>
                <p>@pontogo - Se conecte com a gente</p>
                <hr className="my-4 border-purple-700" />
                <p>PontoGo - Todos direitos reservados</p>
            </footer>
        </div>
    );
}