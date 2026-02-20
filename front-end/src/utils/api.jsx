import axios from "axios";

const GRAPHQL_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/graphql";

export const api = axios.create({
  baseURL: GRAPHQL_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tokenStorage = {
  setTokens: (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  },
  getAccessToken: () => localStorage.getItem("accessToken"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const graphqlRequest = async (query, variables = {}, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await api.post("", {
      query,
      variables,
    });

    const { data, errors } = response.data;

    if (errors && errors.length > 0) {
      const error = new Error(errors[0].message || "GraphQL error");
      error.graphqlErrors = errors;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.response?.data?.errors) {
      const graphqlError = new Error(error.response.data.errors[0].message);
      graphqlError.graphqlErrors = error.response.data.errors;
      throw graphqlError;
    }
    throw error;
  }
};

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        fullName
      }
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
      fullName
      createdAt
      updatedAt
    }
  }
`;

const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

const GET_PROFILE_QUERY = `
  query GetProfile {
    getProfile {
      id
      email
      fullName
      createdAt
      updatedAt
    }
  }
`;

export const AuthApi = {
  login: async (email, password) => {
    try {
      const data = await graphqlRequest(LOGIN_MUTATION, {
        input: {
          email,
          password,
        },
      });

      const loginData = data.login;

      if (loginData.accessToken) {
        tokenStorage.setTokens(loginData.accessToken, loginData.refreshToken);
      }

      return loginData;
    } catch (error) {
      console.error("Login API Error:", {
        url: GRAPHQL_URL,
        message: error.message,
        graphqlErrors: error.graphqlErrors,
      });
      throw error;
    }
  },

  register: async (fullName, email, password) => {
    try {
      const data = await graphqlRequest(REGISTER_MUTATION, {
        input: {
          fullName,
          email,
          password,
        },
      });

      return data.register;
    } catch (error) {
      console.error("Register API Error:", {
        url: GRAPHQL_URL,
        message: error.message,
        graphqlErrors: error.graphqlErrors,
      });
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const refreshTokenValue = tokenStorage.getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error("No refresh token found");
      }

      const data = await graphqlRequest(REFRESH_TOKEN_MUTATION, {
        input: {
          refreshToken: refreshTokenValue,
        },
      });

      const tokenData = data.refreshToken;
      tokenStorage.setTokens(tokenData.accessToken, tokenData.refreshToken);

      return tokenData;
    } catch (error) {
      console.error("Refresh Token API Error:", {
        url: GRAPHQL_URL,
        message: error.message,
        graphqlErrors: error.graphqlErrors,
      });
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        throw new Error("No access token found");
      }

      const data = await graphqlRequest(GET_PROFILE_QUERY, {}, token);
      return data.getProfile;
    } catch (error) {
      console.error("Get Profile API Error:", {
        url: GRAPHQL_URL,
        message: error.message,
        graphqlErrors: error.graphqlErrors,
      });
      throw error;
    }
  },

  logout: () => {
    tokenStorage.clearTokens();
  },
};