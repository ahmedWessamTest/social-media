import axios from "axios";
import { getUserData } from "../../utils/loaders";
import { env } from "../../environment/environment";

export async function handelSignIn(info, navigate) {
  try {
    const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", info, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data.token);
    localStorage.setItem("userToken", data.token);
    const userDataRes = await getUserData();
    localStorage.setItem("user_data", JSON.stringify(userDataRes.user));
    env.loggedUserData = userDataRes.user;
    navigate("/");
    return { success: true, data };
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    const message =
      error.response?.status === 401
        ? "Wrong email or password"
        : error.response?.data?.message || "Something went wrong";
    return { success: false, message };
  }
}
