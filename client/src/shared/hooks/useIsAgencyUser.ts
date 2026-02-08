import { useUser } from "./useUser";
import { Roles } from "../enums/Roles.enum";

interface AgencyUserStatus {
  isAgencyUser: boolean;
  isManager: boolean;
  isAgent: boolean;
}

export const useIsAgencyUser = (): AgencyUserStatus => {
  const { role, user } = useUser();

  const actualRole = role || user?.role;

  const isManager = actualRole === Roles.MANAGER;
  const isAgent = actualRole === Roles.AGENT;
  const isAgencyUser = isManager || isAgent;

  return {
    isAgencyUser,
    isManager,
    isAgent,
  };
};
