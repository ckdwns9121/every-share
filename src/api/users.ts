import axios from 'axios';

export const updateUserName = async (JWT_TOKEN: string, name: string) => {
  const URL = '/api/users/name';

  const config = {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const formData = {
    name,
  };

  const res = await axios.put(URL, formData, config);
  return res;
};
