"use client";

import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";

const addAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login-landing-page");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default addAuth;
