import React from "react";

interface User {
  id: string;
  name: string;
  last_name: string;
  identification_type: "CC" | "TI";
  identification: string;
  address: string | null;
  birthday: string | null;
  email: string;
  rol: "administrador" | "usuario";
}

interface ComponentUserInfoProps {
  userInfoState: User | null;
}

interface InfoFieldProps {
  label: string;
  value: string | null | undefined;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
  <div className="flex flex-col items-center text-white">
    <p className="font-bold">{label}</p>
    <p className="font-light">{value || "Sin información"}</p>
  </div>
);

export const ComponentUserInfo: React.FC<ComponentUserInfoProps> = ({
  userInfoState,
}) => {
  if (!userInfoState) {
    return (
      <div className="grid place-items-center mb-12 text-white">
        <p className="text-lg">No hay información del usuario disponible</p>
      </div>
    );
  }

  const formattedBirthday = userInfoState.birthday
    ? new Date(userInfoState.birthday).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedRol =
    userInfoState.rol.charAt(0).toUpperCase() + userInfoState.rol.slice(1);

  return (
    <div className="grid grid-cols-2 gap-6 mb-12">
      <InfoField label="Nombres" value={userInfoState.name} />
      <InfoField label="Apellidos" value={userInfoState.last_name} />
      <InfoField label="Tipo de I." value={userInfoState.identification_type} />
      <InfoField label="Identificación" value={userInfoState.identification} />
      <InfoField label="Dirección" value={userInfoState.address} />
      <InfoField label="Cumpleaños" value={formattedBirthday} />
      <InfoField label="Correo" value={userInfoState.email} />
      <InfoField label="Rol" value={formattedRol} />
    </div>
  );
};
