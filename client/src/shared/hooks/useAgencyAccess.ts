import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { useIsAgencyUser } from "./useIsAgencyUser";
import { getUserAgencyId } from "../../services/UserService";

interface AgencyAccessStatus {
  isAgencyUser: boolean;
  isManager: boolean;
  isAgent: boolean;
  userAgencyId: number | null;
  belongsToAgency: (agencyId: number) => boolean;
  canManageAgency: (agencyId: number) => boolean;
  canManageAgentsInAgency: (agencyId: number) => boolean;
  loading: boolean;
}

export const useAgencyAccess = (): AgencyAccessStatus => {
  const { user } = useUser();
  const { isAgencyUser, isManager, isAgent } = useIsAgencyUser();
  const [userAgencyId, setUserAgencyId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAgency = async () => {
      if (!user?.idUser || !isAgencyUser) {
        setUserAgencyId(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getUserAgencyId(Number(user.idUser));
        setUserAgencyId(response.data.idAgency);
      } catch (err) {
        console.error("Errore nel recupero dell'agenzia dell'utente:", err);
        setUserAgencyId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAgency();
  }, [user?.idUser, isAgencyUser]);

  const belongsToAgency = (agencyId: number): boolean => {
    return userAgencyId !== null && userAgencyId === agencyId;
  };

  const canManageAgency = (agencyId: number): boolean => {
    return isAgencyUser && belongsToAgency(agencyId);
  };

  const canManageAgentsInAgency = (agencyId: number): boolean => {
    return isManager && belongsToAgency(agencyId);
  };

  return {
    isAgencyUser,
    isManager,
    isAgent,
    userAgencyId,
    belongsToAgency,
    canManageAgency,
    canManageAgentsInAgency,
    loading,
  };
};
