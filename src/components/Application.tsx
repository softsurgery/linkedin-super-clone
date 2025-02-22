import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Image from "next/image";
import { Spinner } from "./Common/Spinner";
import { Layout } from "./Layout/Layout";
import { cn } from "@/lib/utils";
import { Toaster } from "./ui/sonner";
import AuthenticationPage from "./Auth/AuthenticationPage";
import { useAuthPersistStore } from "@/hooks/store/useAuthPersistStore";

interface ApplicationProps {
  className?: string;
  Component: React.ComponentType<AppProps>;
  pageProps: AppProps;
}

function Application({ className, Component, pageProps }: ApplicationProps) {
  const router = useRouter();
  const authPersistStore = useAuthPersistStore();

  // Show a loading screen for admin routes
  if (router.pathname.includes("admin")) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  return (
    <div className={cn(`relative flex flex-col flex-1 min-h-screen`, className)}>
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src="/bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* App Content */}
      <div className="relative flex flex-col flex-1">
        {authPersistStore.isAuthenticated ? (
          <Layout className="flex w-full">
            <Component {...pageProps} />
          </Layout>
        ) : (
          <AuthenticationPage />
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default Application;
