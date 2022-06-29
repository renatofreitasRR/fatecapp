import { useContext } from "react";
import { AuthContext } from "./auth";

interface UseCanParams {
    roleCan?: string;
}

export function useCan({ roleCan }: UseCanParams) {
    const { user } = useContext(AuthContext);

    if (!user.id) {
        return false;
    }

    if (user.perfil === "Administrador")
        return true

    if (roleCan != "" && roleCan != null && roleCan != undefined) {
        return roleCan === user.perfil;
    }

    return true;
}