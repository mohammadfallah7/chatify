import { Resend } from "resend";
import ENV from "./env.js";

const resend = new Resend(ENV.RESEND_API_KEY);

const sender = {
  email: ENV.RESEND_EMAIL_FROM,
  name: ENV.RESEND_EMAIL_FROM_NAME,
};

export { resend, sender };
