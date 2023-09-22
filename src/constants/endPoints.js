// This file contains all the endpoints for the API,front-end and back-end
// django Base URL
export const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

// auth endpoints
export const LOGIN = "/login/getOtp";
export const GET_OTP = "/login/getOtp";
export const REGISTER = "/login/register";
export const VERIFY_OTP = "/login/verifyOtp";
export const RESEND_OTP = "/login/getOtp"; // ? can be used to resend otp

// next api endpoints
export const NEXT_EMAIL = "/api/login/email";
export const NEXT_OTP = "/api/login/otp";
export const NEXT_REGISTER = "/api/login/register";
export const NEXT_VERIFY_OTP = "/api/login/verifyOtp";
export const NEXT_RESEND_OTP = "/api/login/resendOtp";

// django api endpoints
export const DJANGO_EMAIL = `${DJANGO_BASE_URL}/login`;
export const DJANGO_OTP = `${DJANGO_BASE_URL}/verify`;
export const DJANGO_REGISTER = `${DJANGO_BASE_URL}/api/login/register`;
export const DJANGO_VERIFY_OTP = `${DJANGO_BASE_URL}/api/login/verifyOtp`;
export const DJANGO_RESEND_OTP = `${DJANGO_BASE_URL}/api/login/resendOtp`;

// export all the endpoints
const AUTH_ENDPOINTS = {
  LOGIN,
  REGISTER,
  VERIFY_OTP,
  RESEND_OTP,
};

const NEXT_API_ENDPOINTS = {
  NEXT_EMAIL,
  NEXT_OTP,
  NEXT_REGISTER,
  NEXT_VERIFY_OTP,
  NEXT_RESEND_OTP,
};

export { NEXT_API_ENDPOINTS };
export default AUTH_ENDPOINTS;
