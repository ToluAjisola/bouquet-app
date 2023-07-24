export const validation = {};

validation.validateBouquet = (value) => {
    return value !== "";
};
validation.validateEmail = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(value);
};
validation.validFlowerCount = (value) => {
  return value !== "" && value > 0;
};
validation.validDate = (value) => {
    let formdate = new Date(value);
    let todaydate = new Date();
  return formdate > todaydate;
};