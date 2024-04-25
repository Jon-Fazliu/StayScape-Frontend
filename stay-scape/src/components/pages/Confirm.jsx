import React, { useEffect } from "react";
import { useAuth } from "../../AuthService";

const Confirm = () => {
  const auth = useAuth();

  useEffect(() => {
    const confirm = () => {
      const token = new URLSearchParams(window.location.search).get("token");
      auth.confirm(token);
    };

    confirm();
  }, [auth]);

  return <div className="confirm">Confirming account...</div>;
};

export default Confirm;
