// utils/validatePassword.js
export function validatePassword(password) {
    // alert("vonfirme")
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
}
  