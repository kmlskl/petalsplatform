const AUTH_DATA = "auth-data-petals";

export const authenticate = async (username, password) => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/auth/local`,
      {
        method: "POST",
        body: JSON.stringify({ identifier: username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Auth response error", error.response);
    throw error;
  }

  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  setAuthData(data);

  return data;
};

export const register = async (username, password, email) => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Registration response error", error.response);
    throw error;
  }

  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  setAuthData(data);

  return data;
};

export const setAuthData = (authData) => {
  if (authData) {
    localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
  }
};

export const getAuthData = () => {
  const authData = localStorage.getItem(AUTH_DATA);
  return authData ? JSON.parse(authData) : {};
};

export const getToken = () => {
  const authData = getAuthData();
  return authData.jwt;
};

export const getMe = async () => {
  const result = await fetch(
    `${import.meta.env.VITE_STRAPI_URL}/api/users/me?populate=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  ).then((res) => res.json());

  return result;
};

export const removeAuthData = () => {
  localStorage.removeItem(AUTH_DATA);
};

export const changePassword = async (currentPassword, newPassword) => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/auth/local/password-change`,
      {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
  } catch (error) {
    console.log("Change Password response error", error.response);
    throw error;
  }

  const data = await response.json();
  if (data.error) {
    throw data.error;
  }

  // Optionally update the stored auth data if needed
  setAuthData(data);

  return data;
};
