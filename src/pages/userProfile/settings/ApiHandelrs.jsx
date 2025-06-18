import axios from "axios";

export async function handleChangePassword(values) {
  try {
  
    if (!values.password || !values.newPassword) {
      throw new Error("Both password and new password are required.");
    }

    if (values.password === values.newPassword) {
      throw new Error("New password must be different from the old password.");
    }

   
    const res = await axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      {
        password: values.password,
        newPassword: values.newPassword,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
      }
    );
    const token = res.data.token;
    localStorage.setItem("userToken", token); 
    console.log("Password change successful:", res.data);
    return res.data; 

  } catch (err) {
    console.error("Error changing password:", err.message || err);
    throw err; 
  }
}
