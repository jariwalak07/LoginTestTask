const rules = {
  email: [
    {
      type: "email",
      message: "Please enter valid email",
    },
    {
      required: true,
      message: "Please enter your email",
    },
  ],
  password: [
    {
      required: true,
      message: "Please enter password",
    },
    {
      validator(_, value) {
        if (
          !value ||
          new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          ).test(value)
        ) {
          return Promise.resolve();
        }
        return Promise.reject(
          "Password is minimum 8 characters which contain at least one numeric digit,one capital character and one special character"
        );
      },
    },
  ],
};
export default rules;
