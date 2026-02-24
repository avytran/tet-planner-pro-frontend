import { createContext, useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client/react";
import { GET_PROFILE } from "@/graphql/queries/auth.query";
import { LOGIN, LOGOUT } from "@/graphql/mutations/auth.mutation";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const client = useApolloClient();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await client.query({
          query: GET_PROFILE,
          fetchPolicy: "network-only",
        });

        if (data?.getProfile) {
          setUser(data.getProfile);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [client]);

  const login = async (input) => {
    await client.mutate({
      mutation: LOGIN,
      variables: { input },
    });

    const { data } = await client.query({
      query: GET_PROFILE,
      fetchPolicy: "network-only",
    });

    setUser(data.getProfile);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await client.mutate({
      mutation: LOGOUT,
    });

    setUser(null);
    setIsAuthenticated(false);
    await client.clearStore();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};