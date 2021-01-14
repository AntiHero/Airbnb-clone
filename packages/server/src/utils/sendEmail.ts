import SparkPost from "sparkpost";

const client = new SparkPost(process.env.SPARKPOST_API_KEY, {
  endpoint: "https://api.eu.sparkpost.com:443"
});

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: process.env.NODE_ENV === 'test' ? true : false,
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "Confirm Email!",
      html: `<html><body><a href="${url}" target="_blank">Confirm your email</a></body></html>`,
    },
    recipients: [{ address: recipient }],
  });
  console.log(response);
};
