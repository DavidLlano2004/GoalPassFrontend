import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { paths } from "../../../../routes/paths";
import { useNavigate } from "react-router";
import { useMutationLogout } from "../../../../auth/hooks/useMutationLogout.hooks";

interface Props {
  name: string;
  email: string;
}

export const MenuAccountButton = ({ name, email }: Props) => {
  const { logoutMutation } = useMutationLogout();

  const logoutFunction = () => {
    logoutMutation.mutate();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="flex items-center gap-3 sm:px-4 cursor-pointer hover:bg-white/10 duration-200 transition-all py-2 rounded-xl">
          <span className="w-10 h-10 rounded-full bg-black-1-custom grid place-items-center">
            <i className="fi fi-rr-user text-white text-lg flex"></i>
          </span>
          <div className="sm:flex hidden items-center gap-3">
            <p className="font-bold text-white text-lg">{name}</p>
            <i className="fi fi-ts-angle-small-down text-white flex"></i>
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
        <DropdownSection
          classNames={{ divider: "bg-gray-1-custom" }}
          showDivider
          aria-label="Profile & Actions"
        >
          <DropdownItem
            key="profile"
            isReadOnly
            className="h-14 gap-2 opacity-100"
          >
            <User
              avatarProps={{
                className: "hidden",
              }}
              classNames={{
                name: "text-white",
                description: "text-white",
              }}
              description={email}
              name={name}
            />
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          onPress={() => logoutFunction()}
          key="delete"
          className="text-red-1-custom"
          color="danger"
          startContent={
            <i className="fi fi-ts-sign-out-alt flex text-red-1-custom"></i>
          }
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
