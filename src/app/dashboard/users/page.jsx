'use client';
import TableInfo from '../components/TableInfo';
import { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { AuthStore } from '../../stores/Auth';
import { redirect } from 'next/navigation';
import { UsersStore } from '../../stores/Users';

export default function Page(params) {
    const authStore = AuthStore();
    const usersStore = UsersStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [users, setUsers] = useState([])
    const newUserInfo = useRef({
        email: '',
        password: '',
        name: '',
        lastname: '',
        phoneNumber: '',
        institution: authStore.user.institution
    })
    useEffect(() => {
        if (!authStore.logged) {
            redirect('/auth/login');
        }
        getUsers(authStore.user.institution).then((users) => setUsers(users));
    }, [])

    const getUsers = async (institution) => {
        try {
          const response = await usersStore.getUsers(institution);
          return response;
        } catch (error) {
          console.log(error);
        }
      }
    

    const registerProcess = async () => {
        try {
            let res = await usersStore.registerUser(newUserInfo.current);
            console.log(res.data.success);
            if (res.data.success) {
                onOpenChange();
            }else{
                console.log('error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            key: "name",
            label: "Nombre",
        },
        {
            key: "email",
            label: "Correo",
        },
        {
            key: "phoneNumber",
            label: "Telefono",
        },
        {
            key: "creation_date",
            label: "Fecha de creación",
        },
    ];
    const [selected, setSelected] = useState(null)
    return (
        <div className="w-full overflow-x-auto m-4">
            <div className=" mb-10 grid grid-cols-12">
                <h1 className="col-span-12 w-full text-4xl font-bold">
                    Usuarios
                </h1>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2'>
                <p className=" w-full text-xl font-bold">Tabla de usuarios</p>
                <div className="w-full ml-96">
                    <Button onPress={async () => { console.log('xd'); onOpen() }} color="success" size="sm" variant="ghost" children={<h3 className="text-sm font-bold">Nuevo usuario</h3>} />
                </div>
            </div>

            <div className='w-full p-4'>
                <TableInfo rows={users} columns={columns} setSelected={setSelected} idRow={'creation_date'}/>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Usuario nuevo.</ModalHeader>

                            <ModalBody>
                                <Input
                                    autoFocus
                                    onValueChange={(e) => { newUserInfo.current.name = e }}
                                    label="Nombre"
                                    classNames={{
                                        input: ['border-transparent']
                                    }}
                                />
                                <Input
                                    label="Apellidos"
                                    onValueChange={(e) => { newUserInfo.current.lastname = e }}
                                    classNames={{
                                        input: ['border-transparent']
                                    }}
                                />
                                <Input
                                    label="Correo electrónico"
                                    onValueChange={(e) => { newUserInfo.current.email = e }}
                                    classNames={{
                                        input: ['border-transparent']
                                    }}
                                />
                                <Input
                                    label="Número de telefono"
                                    onValueChange={(e) => { newUserInfo.current.phoneNumber = e }}
                                    classNames={{
                                        input: ['border-transparent']
                                    }}
                                />
                                <Input
                                    label="Contraseña"
                                    onValueChange={(e) => { newUserInfo.current.password = e }}
                                    type='password'
                                    classNames={{
                                        input: ['border-transparent']
                                    }}
                                />
                                <div className="flex py-2 px-1 justify-between">
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="success" onPress={async () => {await registerProcess();}}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}