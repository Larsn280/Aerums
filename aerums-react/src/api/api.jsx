export const freeTimeApi = async (userName) => {
  
  try {
    const response = await fetch(`${process.env.REACT_APP_BASEURL}/freetime/user/${userName}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};