import { ReactNode } from "react";
import { useCan } from "../../hooks/useCan";

interface CanProps {
    children: ReactNode;
    roleCan?: string;
}

export function Can({ children, roleCan }: CanProps) {
    const userCanSeeComponent = useCan({
        roleCan,
    });

    if (!userCanSeeComponent) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}