import { useAuthPersistStore } from "@/hooks/store/useAuthPersistStore";
import { useRouter } from "next/router";
import React from "react";

export function DisconnectComponent() {
  const router = useRouter();
  const authPersistStore = useAuthPersistStore();

  React.useEffect(() => {
    router.replace("/");
    authPersistStore.logout();
  }, [router]);
  return null;
}
