import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tresorbana77@gmail.com',
    pass: 'dpamwuzijsutafdl',
  },
});

export default transporter; 