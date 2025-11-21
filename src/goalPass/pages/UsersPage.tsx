import { motion } from "framer-motion";
import { ButtonSimple } from "../../shared/components/molecules/buttons/ButtonSimple";
import { useForm } from "react-hook-form";
import { TableUsers } from "../../shared/components/organims/tables/TableUsers";
import { ComponentEmpty } from "../../shared/components/molecules/empty/ComponentEmpty";
import { ModalCustom } from "../../shared/components/organims/modals/ModalCustom";
import { addToast, useDisclosure } from "@heroui/react";
import {
  FormCreateUser,
  type CreateUserFormData,
} from "../components/molecules/forms/FormCreateUser";
import { useQueryUsers } from "../hooks/useQueryUsers.hook";
import { SkeletonUsers } from "../../shared/components/organims/skeletons/SkeletonUsers";
import { useMutationRegister } from "../../auth/hooks/useMutationRegister.hooks";
import { useMutationUsers } from "../hooks/useMutationUsers.hook";
import { useState } from "react";
import { FormUpdateUser } from "../components/molecules/forms/FormUpdateUser";

export const UsersPage = () => {
  const { getUsersQuery } = useQueryUsers();
  const { registerMutation } = useMutationRegister();
  const { deleteUserMutation, updateUserMutation } = useMutationUsers();

  const [userInfoState, setUserInfoState] = useState("");

  const {
    setError: setErrorCreateUser,
    reset: resetCreateUser,
    control: controlCreateUser,
    register: registerCreateUser,
    watch: watchCreateUser,
    handleSubmit: handleSubmitCreateUser,
    clearErrors: clearErrorsCreateUser,
  } = useForm<CreateUserFormData>({
    defaultValues: {
      name: "",
      last_name: "",
      identification_type: "CC",
      identification: "",
      rol: "",
      birthday: "",
      email: "",
      password: "",
    },
  });
  const {
    password: passwordCreateUser,
    confirm_password: confirm_passwordCreateUser,
  } = watchCreateUser();
  const dataFormCreateUser = watchCreateUser();

  const {
    reset: resetUpdateUser,
    setError: setErrorUpdateUser,
    control: controlUpdateUser,
    register: registerUpdateUser,
    watch: watchUpdateUser,
    handleSubmit: handleSubmitUpdateUser,
  } = useForm<CreateUserFormData>();

  const dataFormUpdateUser = watchUpdateUser();

  const {
    isOpen: isOpenModalCreateUser,
    onOpen: onOpenModalCreateUser,
    onClose: onCloseModalCreateUser,
  } = useDisclosure();

  const {
    isOpen: isOpenModalUpdateUser,
    onOpen: onOpenModalUpdateUser,
    onClose: onCloseModalUpdateUser,
  } = useDisclosure();

  const {
    isOpen: isOpenModalDeleteUser,
    onOpen: onOpenModalDeleteUser,
    onClose: onCloseModalDeleteUser,
  } = useDisclosure();

  if (getUsersQuery.isLoading) {
    return <SkeletonUsers />;
  }

  const closeModalCreateUser = () => {
    onCloseModalCreateUser();
    resetCreateUser();
    clearErrorsCreateUser();
  };

  const chooseUserByDelete = (user: string) => {
    onOpenModalDeleteUser();
    setUserInfoState(user);
  };

  const closeModalDeleteUser = () => {
    onCloseModalDeleteUser();
    setUserInfoState("");
  };

  const chooseUserByUpdate = (user: string) => {
    onOpenModalUpdateUser();
    setUserInfoState(user);
  };

  const closeModalUpdateUser = () => {
    resetUpdateUser();
    onCloseModalUpdateUser();
    setUserInfoState("");
  };

  const createUserFunction = () => {
    if (passwordCreateUser != confirm_passwordCreateUser) {
      setErrorCreateUser("confirm_password", {
        type: "server",
        message: "Las contraseñas no coinciden",
      });
      return false;
    }
    registerMutation.mutate(dataFormCreateUser, {
      onSuccess: () => {
        closeModalCreateUser();
        addToast({
          title: "Registro",
          description: "Usuario creado con éxito",
          color: "success",
        });
      },
      onError: (error: any) => {
        if (error.error === "Email already registered") {
          setErrorCreateUser("email", {
            type: "server",
            message: "Este correo ya está registrado",
          });
        }
        if (error.error === "Identification already registered") {
          setErrorCreateUser("identification", {
            type: "server",
            message: "La identificación ya está en uso",
          });
        }
      },
    });
  };

  const deleteUserFunction = () => {
    deleteUserMutation.mutate(userInfoState?.id, {
      onSuccess: () => {
        closeModalDeleteUser();
        addToast({
          title: "Usuario",
          description: "Usuario eliminado con éxito",
          color: "success",
        });
      },
    });
  };

  const updateUserFunction = () => {
    updateUserMutation.mutate(
      { dataForm: dataFormUpdateUser, userId: userInfoState?.id },
      {
        onSuccess: () => {
          closeModalUpdateUser();
          addToast({
            title: "Editar",
            description: "Usuario editado con éxito",
            color: "success",
          });
        },
        onError: (error: any) => {
          if (error.error === "Email already registered") {
            setErrorUpdateUser("email", {
              type: "server",
              message: "Este correo ya está registrado",
            });
          }
          if (error.error === "Identification already registered") {
            setErrorUpdateUser("identification", {
              type: "server",
              message: "La identificación ya está en uso",
            });
          }
        },
      }
    );
  };

  console.log("====================================");
  console.log(userInfoState);
  console.log("====================================");

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
        {(getUsersQuery.data?.users ?? []).length > 0 ? (
          <div className="mt-4">
            <TableUsers
              chooseUserByUpdate={chooseUserByUpdate}
              chooseUserByDelete={chooseUserByDelete}
              dataTable={getUsersQuery.data?.users}
            />
          </div>
        ) : (
          <div className="mt-4  flex-1 grid place-items-center">
            <ComponentEmpty textComponentEmpty="No hay usuarios creados" />
          </div>
        )}
      </div>

      <ModalCustom
        onSubmitModal={handleSubmitCreateUser(createUserFunction)}
        isOpen={isOpenModalCreateUser}
        onClose={closeModalCreateUser}
        textButton="Crear"
        titleModal={"Crear usuario"}
        isLoadingButton={registerMutation.isPending}
      >
        <FormCreateUser
          password={passwordCreateUser}
          register={registerCreateUser}
          control={controlCreateUser}
        />
      </ModalCustom>
      <ModalCustom
        onSubmitModal={handleSubmitUpdateUser(updateUserFunction)}
        isOpen={isOpenModalUpdateUser}
        onClose={closeModalUpdateUser}
        textButton="Editar"
        titleModal={"Editar usuario"}
        isLoadingButton={updateUserMutation.isPending}
      >
        <FormUpdateUser
          userInfoState={userInfoState}
          register={registerUpdateUser}
          control={controlUpdateUser}
          reset={resetUpdateUser}
        />
      </ModalCustom>
      <ModalCustom
        onSubmitModal={deleteUserFunction}
        isOpen={isOpenModalDeleteUser}
        onClose={closeModalDeleteUser}
        textButton="Eliminar"
        titleModal={"Eliminar usuario"}
        isLoadingButton={deleteUserMutation.isPending}
      >
        <div className="my-4">
          <h1 className="text-center text-white text-[20px] font-bold">
            ¿Quieres eliminar este usuario?
          </h1>
          <p className="text-center text-white font-extralight mt-2 w-[80%] mx-auto">
            No podrás recuperar la información de este usuario
          </p>
        </div>
      </ModalCustom>
    </motion.div>
  );
};
