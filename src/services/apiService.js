import axios from "axios";

const postLogin = (email, password) => {
  return axios.post(
    `http://pandoraolaole-001-site1.btempurl.com/Account/login`,
    {
      email,
      password,
    }
  );
};

const postRegister = (email, password, username, phone, name) => {
  return axios.post(
    `http://pandoraolaole-001-site1.btempurl.com/Account/register`,
    {
      email,
      password,
      username,
      name,
      phone,
    }
  );
};

export { postLogin, postRegister };
