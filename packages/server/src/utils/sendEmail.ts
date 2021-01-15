import SparkPost from "sparkpost";

const client = new SparkPost(process.env.SPARKPOST_API_KEY, {
  endpoint: 'https://api.sparkpost.com:443'
});

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: false,
    },
    content: {
      from: "bounces@bounces.zero-studio.art",
      subject: "Confirm Email!",
      html: `<html><body><a href="${url}" target="_blank">Confirm your email</a></body></html>`,
    },
    recipients: [{ address: recipient }],
  });
  console.log(response);
};
