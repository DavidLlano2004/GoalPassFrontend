import { motion } from "framer-motion";
import { ButtonSimple } from "../../shared/components/molecules/buttons/ButtonSimple";
import { InputSimple } from "../../shared/components/molecules/input/InputSimple";
import { SelectSimple } from "../../shared/components/molecules/select/SelectSimple";
import { useForm } from "react-hook-form";
import { TableUsers } from "../../shared/components/organims/tables/TableUsers";
import { ComponentEmpty } from "../../shared/components/molecules/empty/ComponentEmpty";
import { ModalCustom } from "../../shared/components/organims/modals/ModalCustom";
import { useDisclosure } from "@heroui/react";
import { FormCreateUser } from "../components/molecules/forms/FormCreateUser";
motion;

export const UsersPage = () => {
  const { control } = useForm();
  const { control: controlCreateUser } = useForm();

  const {
    isOpen: isOpenModalCreateUser,
    onOpen: onOpenModalCreateUser,
    onClose: onCloseModalCreateUser,
  } = useDisclosure();
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col"
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
        <div className="flex items-center justify-between sm:flex-nowrap flex-wrap">
          <div className="">
            <h1 className="text-[20px] text-white font-bold">
              Gestion de usuarios
            </h1>
            <p className="text-white font-extralight">
              Crea y gestiona usuarios por rol
            </p>
          </div>
          <div className="sm:mt-0 mt-6 sm:w-auto w-full">
            <ButtonSimple
              actionButton={() => onOpenModalCreateUser()}
              startContent={
                <i className="fi fi-rr-plus-small text-[20px] text-white flex"></i>
              }
              textButton="Crear usuario"
              widthButton="min-w-[190px] w-full"
            />
          </div>
        </div>
        {[1].length > 0 ? (
          <>
            <div className=" bg-black-2-custom w-full h-auto rounded-[15px] justify-between p-6 flex lg:flex-row flex-col gap-4 flex-wrap mt-6">
              <div className="flex-1">
                <InputSimple
                  endContent={
                    <div className="flex items-center justify-center h-full">
                      <i className="fi fi-rr-search text-[18px] text-gray-3-custom flex" />
                    </div>
                  }
                  control={control}
                  nameRegister="name"
                  label="Buscar usuario...."
                  validations={{ required: "El nombre es requerido" }}
                />
              </div>
              <div className="lg:w-[214px] w-full">
                <SelectSimple
                  control={control}
                  nameRegister="rol"
                  label="Tipo de usuario"
                  options={[]}
                  validations={{ required: "Seleccione un rol" }}
                  labelOption={""}
                  uppercase={false}
                />
              </div>
            </div>
            <div className="mt-4">
              <TableUsers />
            </div>
          </>
        ) : (
          <div className="mt-4  flex-1 grid place-items-center">
            <ComponentEmpty textComponentEmpty="No hay usuarios creados" />
          </div>
        )}
      </div>

      <ModalCustom
        // onSubmitModal={handleCreateMatch(onSubmitCreateMatch)}
        isOpen={isOpenModalCreateUser}
        onClose={onCloseModalCreateUser}
        textButton="Crear"
        titleModal={"Crear usuario"}
      >
        <FormCreateUser control={controlCreateUser} />
      </ModalCustom>
    </motion.div>
  );
};
