'use client';
import React, {useRef, useState} from "react";
import Image from 'next/image';
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import {AuthStore} from '../../stores/Auth';
export default function Page() {
    const router = useRouter();
    const authStore = AuthStore();
    const loginInfo = useRef({
        email: '',
        password: ''
    })
    const [info, setInfo] = useState('');
    const loginProcess = async () => {
        try {
            let res = await authStore.login(loginInfo.current.email, loginInfo.current.password);
            if (res.data.success) {
                authStore.setUser(res.data.body.data);
                authStore.setLogged(true);
                router.push('/dashboard');
                return true;
            }else{
                setInfo('Credenciales incorrectas o falta de verificación.');
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="flex justify-center">

            <div className="mt-32 w-5/12 h-4/6 rounded-xl p-4 flex flex-col items-center border-slate-950 border-2">
                <Image
                    alt='Hola'
                    width={220}
                    height={220}
                    className='hidden md:block'
                    src='/squid.png'
                />
                <p className="text-xl font-bold text-red-600">{info}</p>
                <Input
                    isRequired
                    onValueChange={(e)=> {loginInfo.current.email = e} }
                    type="email"
                    label="Correo electrónico"
                    className="max-w-md mt-6"
                    classNames={{
                        input: ['border-transparent']
                    }}
                />
                <Input
                    isRequired
                    onValueChange={(e)=> {loginInfo.current.password = e} }
                    type="password"
                    label="Contraseña"
                    className="max-w-md mt-12"
                    classNames={{
                        input: ['border-transparent']
                    }}
                />

                <div className="w-64">
                    <Button onPress={async () => {await loginProcess();}} color="success" size="lg" variant="ghost" className="mt-12 p-8" fullWidth={true}>
                    <h3 className="text-2xl font-bold">Iniciar sesión</h3>
                    </Button>
                </div>
                <Link className="mt-12" isBlock showAnchorIcon href="#" color="success">
                    ¿Olvidaste tu contraseña?
                </Link>
                <Link className="mt-2" isBlock showAnchorIcon href="/auth/register" color="success">
                    Registrarse
                </Link>
            </div>

        </div>
    )
}