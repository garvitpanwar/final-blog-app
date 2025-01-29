import AWS from "aws-sdk";

const ses = new AWS.SES({
  region: "us-east-1",
  accessKeyId: "AKIA47CRV54LCHD62KUX",
  secretAccessKey: "BGIQwH8LIhCZ4k9ITxypAIwA18xDgnFc5ERsvXLSKJNF",
});

export async function POST(req) {
  try {
    const { name, email, suggestions } = await req.json();

    const params = {
      Source: "yash.chauhan.yc@outlook.com",
      Destination: {
        ToAddresses: [`${email}`], 
      },
      Message: {
        Subject: {
          Data: "New Suggestion from Blog Form",
        },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\nSuggestions: ${suggestions}`,
          },
          Html: {
            Data: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Suggestions:</strong> ${suggestions}</p>`,
          },
        },
      },
    };


    const result = await ses.sendEmail(params).promise();
    console.log("SES Result:", result);

    return new Response(
      JSON.stringify({ message: "Email sent successfully", result: result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Error sending email", error: error.message }),
      { status: 500 }
    );
  }
}
