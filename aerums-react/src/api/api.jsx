export const freeTimeApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASEURL}/freetime`, {
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
