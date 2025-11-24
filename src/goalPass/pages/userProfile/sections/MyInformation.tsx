import { useEffect, useState } from "react";
import { ButtonSimple } from "../../../../shared/components/molecules/buttons/ButtonSimple";
import { useForm } from "react-hook-form";
import { FormEditProfile } from "../../../components/molecules/forms/FormEditProfile";
import { useMutationMe } from "../../../hooks/useMutationMe.hook";
import { addToast, Button, useDisclosure } from "@heroui/react";
import { ModalCustom } from "../../../../shared/components/organims/modals/ModalCustom";
import { FormChangePassword } from "../../../components/molecules/forms/FormChangePassword";
import { useMutationLogout } from "../../../../auth/hooks/useMutationLogout.hooks";

export const MyInformation = ({ userInformation }: any) => {
  const { updateMeMutation, deleteMeMutation } = useMutationMe();
  const { logoutMutation } = useMutationLogout();

  const [valueBirthday, setValueBirthday] = useState();
  const [isEdit, setIsEdit] = useState(true);

  const defaultValues = {
    actually_password: "",
    password: "",
    confirm_password: "",
  };
  const {
    control,
    reset,
    register,
    watch,
    setError,
    clearErrors,
    handleSubmit,
  } = useForm({
    defaultValues,
  });
  const dataForm = watch();
  const { password, confirm_password } = dataForm;

  const {
    isOpen: isOpenModalChangePassword,
    onOpen: onOpenModalChangePassword,
    onClose: onCloseModalChangePassword,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeleteAccount,
    onOpen: onOpenModalDeleteAccount,
    onClose: onCloseModalDeleteAccount,
  } = useDisclosure();

  const updateMeFunction = () => {
    updateMeMutation.mutate(dataForm, {
      onSuccess: () => {
        setIsEdit(true);
      },
    });
  };

  const closeModalChangePassword = () => {
    clearErrors();
    reset();
    onCloseModalChangePassword();
  };

  const changePassword = () => {
    if (password != confirm_password) {
      setError("confirm_password", {
        type: "server",
        message: "Las contraseñas no coinciden",
      });
      return false;
    }
    updateMeMutation.mutate(
      { password: confirm_password },
      {
        onSuccess: () => {
          closeModalChangePassword();
          addToast({
            title: "Contraseña",
            description: "Contraseña actualizada con éxito",
            color: "success",
          });
        },
      }
    );
  };

  const deleteAccounFunction = () => {
    deleteMeMutation.mutate(undefined, {
      onSuccess: () => {
        logoutMutation.mutate();
      },
    });
  };

  const isLoadingButtonModal =
    deleteMeMutation.isPending || logoutMutation.isPending;

  useEffect(() => {
    if (userInformation) {
      reset({
        name: userInformation?.name || "Sin información",
        last_name: userInformation?.last_name || "Sin información",
        email: userInformation?.email || "Sin información",
        address: userInformation?.address || "Sin información",
        identification: userInformation?.identification || "Sin información",
        identification_type: userInformation?.identification_type || "CC",
        birthday: userInformation?.birthday || "Sin información",
      });
    }
  }, [userInformation]);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap sm:gap-0 gap-4">
        <h1 className="font-bold text-[18px]">Información personal</h1>
        <div
          className={`flex flex-1 ${!isEdit ? "lg:mt-0 mt-4" : "lg:mt-0"}  justify-end gap-3`}
        >
          <ButtonSimple
            actionButton={
              !!isEdit
                ? () => setIsEdit((prev) => !prev)
                : () => updateMeFunction()
            }
            startContent={
              <i
                className={`fi fi-rr-${
                  !isEdit ? "paper-plane-top" : "edit"
                } paper-plane-top text-[16px] text-white flex order-2`}
              ></i>
            }
            isLoading={updateMeMutation.isPending}
            borderGradient={!!isEdit}
            textButton={!isEdit ? "Enviar" : "Editar perfil"}
            widthButton="max-w-[191px] sm:min-w-[190px] w-full"
            heightButton="h-[45px]"
            bgColorButton={
              !isEdit
                ? "bg-linear-to-r from-blue-1-custom to-green-1-custom"
                : "bg-gray-2-custom"
            }
          />
          {!isEdit && (
            <ButtonSimple
              actionButton={() => setIsEdit((prev) => !prev)}
              borderGradient
              textButton={"Cancelar"}
              widthButton="max-w-[191px] sm:min-w-[190px] w-full"
              heightButton="h-[45px]"
              bgColorButton="bg-gray-2-custom"
            />
          )}
        </div>
      </div>
      <FormEditProfile
        register={register}
        control={control}
        setValuePicker={setValueBirthday}
        valuePicker={valueBirthday}
        edit={isEdit}
      />
      <div className="w-full h-px bg-white my-10"></div>
      <div>
        <h1 className="font-bold text-[18px]">Seguridad</h1>
        <Button
          onPress={() => onOpenModalChangePassword()}
          className="min-w-0 w-full justify-start items-center mt-4 bg-gray-2-custom text-white h-[50px]!"
        >
          <i className="fi fi-tr-lock-hashtag flex text-[16px]"></i>
          <p className="text-[16px]">Cambiar contraseña</p>
        </Button>
        <Button
          onPress={() => onOpenModalDeleteAccount()}
          className="min-w-0 w-full justify-start items-center mt-4 bg-gray-2-custom text-white h-[50px]!"
        >
          <i className="fi fi-tr-delete-user flex text-[16px]"></i>
          <p className="text-[16px]">Eliminar cuenta</p>
        </Button>
      </div>
      <ModalCustom
        onSubmitModal={handleSubmit(changePassword)}
        isOpen={isOpenModalChangePassword}
        onClose={closeModalChangePassword}
        textButton="Guardar"
        titleModal={"Cambiar contraseña"}
        isLoadingButton={updateMeMutation.isPending}
      >
        <FormChangePassword control={control} password={password} />
      </ModalCustom>
      <ModalCustom
        onSubmitModal={deleteAccounFunction}
        isOpen={isOpenModalDeleteAccount}
        onClose={onCloseModalDeleteAccount}
        textButton="Eliminar"
        titleModal={"Eliminar cuenta"}
        isLoadingButton={isLoadingButtonModal}
      >
        <div className="my-4">
          <h1 className="text-center text-white text-[20px] font-bold">
            ¿Quieres eliminar esta cuenta?
          </h1>
          <p className="text-center text-white font-extralight mt-2 w-[80%] mx-auto">
            Recuerda que no podrás recuperar tú información personal
          </p>
        </div>
      </ModalCustom>
    </div>
  );
};
