import SparkPost from "sparkpost";

const client = new SparkPost(process.env.SPARKPOST_API_KEY, {
  origin: "https://api.eu.sparkpost.com/api/v1"
});

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true,
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
