import client from "./client";

const register = (doctorInfo) => client.post("/doctors", doctorInfo);

export default {
  register,
};
