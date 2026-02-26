import { createContext, useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client/react";
import { GET_PROFILE } from "@/graphql/queries/auth.query";
import { LOGIN, LOGOUT } from "@/graphql/mutations/auth.mutation";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const client = useApolloClient();

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const fetchProfile = async () => {
    try {
      const { data } = await client.query({
        query: GET_PROFILE,
        fetchPolicy: "network-only",
      });

      if (data?.getProfile) {
        setUser(data.getProfile);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch (err) {
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (input) => {
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: { input },
    });

    setUser(data.login.user);
    setStatus("authenticated");
  };

  const logout = async () => {
    await client.mutate({
      mutation: LOGOUT,
    });

    setUser(null);
    setStatus("unauthenticated");
    await client.clearStore();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: status === "authenticated",
        loading: status === "loading",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};