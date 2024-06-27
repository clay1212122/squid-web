import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function SModal({setModalOpen, setContinueFunction, modalOpen, message, title}) {
  return (
      <Modal isOpen={modalOpen} backdrop="blur" hideCloseButton={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-red-500">{title}</ModalHeader>
              <ModalBody>
                <p className=" text-justify"> 
                  {message}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>setModalOpen(false)}>
                  Cerrar
                </Button>
                <Button color="success" onPress={setContinueFunction}>
                  Continuar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
