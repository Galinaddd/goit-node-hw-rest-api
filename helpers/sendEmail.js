const nodemailer = require("nodemailer");

const { MAIL_PASSWORD, MAIL_USER } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
};

const sendEmail = (data) => {
  const transporter = nodemailer.createTransport(config);

  transporter
    .sendMail(data)
    .then(() => {
      console.log("Email send success!");
    })
    .catch((err) => console.log(err));
};

module.exports = sendEmail;
