'use client';
import React, { useRef, useState } from "react";
import Image from 'next/image';
import { Input, Button, Link, Checkbox } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { AuthStore } from '../../stores/Auth';
import SModal from "../../ui/SModal";
export default function Page() {
    const router = useRouter();
    const authStore = AuthStore();
    const [shoppingCode, setShoppingCode] = useState(false)
    const loginInfo = useRef({
        email: '',
        password: '',
        name: '',
        lastname: '',
        phoneNumber: '',
        shopping_code: '',
        confirm_password: '',
        institution: '',
    })
    const [info, setInfo] = useState('');
    const registerProcess = async () => {
        try {
            let res = await authStore.register(loginInfo.current);
            console.log(res.data);
            if (res.data.success) {
                router.push('/auth/login');
                return true;
            } else {
                setInfo(res.data.body.message);
            }
            
        } catch (error) {
            console.log(error);
        }finally{
            setModalOpen(false);
        }
    }

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="flex justify-center overflow-x-auto">
            <div className="mt-32 w-5/12 h-fit rounded-xl flex flex-col items-center border-slate-950 border-2 mb-32">
                <Image
                    alt='Hola'
                    width={220}
                    height={220}
                    className='hidden md:block'
                    src='/squid.png'
                />
                <p className="text-xl font-bold text-red-600 text-center">{info}</p>
                <p className="text-xl font-bold text-[#18c964] text-center">Registrate para empezar a gestionar tus productos.</p>
             
                <div className="w-4/5 h-fit grid grid-cols-2 gap-2">
                    <div>
                        <Input
                            isRequired
                            onValueChange={(e) => { loginInfo.current.name = e }}
                            type="name"
                            label="Nombre"
                            className="max-w-md mt-6"
                            classNames={{
                                input: ['border-transparent']
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            isRequired
                            onValueChange={(e) => { loginInfo.current.lastname = e }}
                            type="name"
                            label="Apellidos"
                            className="max-w-md mt-6"
                            classNames={{
                                input: ['border-transparent']
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            isRequired
                            onValueChange={(e) => { loginInfo.current.email = e }}
                            type="name"
                            label="Correo electrónico"
                            className="max-w-md mt-6"
                            classNames={{
                                input: ['border-transparent']
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            isRequired
                            onValueChange={(e) => { loginInfo.current.phoneNumber = e }}
                            type="name"
                            label="Telefono"
                            className="max-w-md mt-6"
                            classNames={{
                                input: ['border-transparent']
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            isRequired
                            onValueChange={(e) => { loginInfo.current.password = e }}
                            type="name"
                            label="Contraseña"
                            className="max-w-md mt-6"
                            classNames={{
                                input: ['border-transparent']
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            isRequired
                            onValueChange={(e) => { loginInfo.current.confirm_password = e }}
                            type="name"
                            label="Confirmar contraseña"
                            className="max-w-md mt-6"
                            classNames={{
                                input: ['border-transparent']
                            }}
                        />
                    </div>

                </div>

                <div className="flex flex-col items-start max-w-lg w-2/5 mt-4">
                    <Input
                        onValueChange={(e) => { loginInfo.current.institution = e }}
                        type="email"
                        isRequired
                        label="Institución"
                        className="max-w-sm mt-2"
                        classNames={{
                            input: ['border-transparent']
                        }}
                    />
                </div>

                <div className="flex flex-col items-start max-w-lg w-2/5">
                    <Checkbox checked={shoppingCode} onValueChange={setShoppingCode} size="lg" className="mt-6 ">¿Cuentas con un código de compra?</Checkbox>
                    <Input
                        isDisabled={!shoppingCode}
                        onValueChange={(e) => { loginInfo.current.shopping_code = e }}
                        type="password"
                        label="Código de compra"
                        className="max-w-sm mt-2"
                        classNames={{
                            input: ['border-transparent']
                        }}
                    />
                </div>

                <div className="flex flex-col items-start max-w-lg w-2/5">
                    <Checkbox size="lg" className="mt-6 ">Al crear mi cuenta estoy de acuerdo con: </Checkbox>
                    <ol className="list-disc ml-12 mt-4">
                        <li><Link href="https://squid-biological.com/aviso-de-privacidad">Politica de privacidad y datos</Link></li>
                        <li><Link href="https://squid-biological.com/aviso-de-privacidad">Terminos y condiciones</Link></li>
                    </ol>
                </div>
                <div className="w-64">
                    <Button onPress={async () => { console.log(loginInfo); setModalOpen(true); }} color="success" size="lg" variant="ghost" className="mt-12 mb-12 p-8" fullWidth={true} children={<h3 className="text-2xl font-bold">Crear cuenta</h3>} />
                </div>
            </div>
            <SModal 
                setModalOpen={setModalOpen} 
                setContinueFunction={registerProcess} 
                modalOpen={modalOpen} 
                title={"ADVERTENCIA."}
                message={`Recuerda que esta creación de cuenta solo es para administradores de instituciones, 
                  si tu eres un operador contactate con tu administrador para la creación de tu cuenta`}
                />
        </div>
    )
}