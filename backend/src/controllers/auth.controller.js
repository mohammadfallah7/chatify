const signup = (req, res) => {
  res.send("Signup endpoint");
};

const login = (req, res) => {
  res.send("Login endpoint");
};

const logout = (req, res) => {
  res.send("Logout endpoint");
};

export { login, logout, signup };
