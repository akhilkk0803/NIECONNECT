import { url } from "../../url";

export const getUser = async (username, suggestion = false) => {
  const res = await fetch(
    url + "user/" + username + "/?suggestion=" + suggestion
  );
  if (res.status === 404) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return res.json();
};
