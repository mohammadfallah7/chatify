import { resend, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./email-templates.js";

const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    return resend.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(name, clientURL),
    });
  } catch (error) {
    console.error("Error in send welcome email", error);
    throw new Error("Failed to send welcome email");
  }
};

export { sendWelcomeEmail };
