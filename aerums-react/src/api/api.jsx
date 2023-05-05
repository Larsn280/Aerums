export const freeTimeApi = async (userName) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/freetime/user/${userName}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const bookingApi = async (userName) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/booking/user/${userName}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addFreeTimeApi = async (freetime) => {
  console.log(freetime);
  try {
    const response = await fetch(`${process.env.REACT_APP_BASEURL}/freetime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(freetime),
    });

    if (response.status >= 200 && response.status <= 299) {
      console.log("Tiden är sparad");
    } else {
      console.log("Det gick fel någonstans");
    }
  } catch (error) {
    console.error(error);
  }
};
