
const validateUser = async (username: string, password: string): Promise<boolean> => {
  
  return username === "admin" && password === "admin";
};

export { validateUser }