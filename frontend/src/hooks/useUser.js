import { useContext } from "react";
import { UserContext } from "./../contexts/user";

export default function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }

  return context;
}
