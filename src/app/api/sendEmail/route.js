import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAT7JJU3KAUDOF4KIT",
  secretAccessKey: "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",
});

const ses = new AWS.SES({ apiVersion: "latest" });

export async function POST(req) {
  try {
    const { name, email, suggestions } = await req.json();

    const params = {
      Source: email,
      Destination: {
        ToAddresses: ["panwargarvit31@gmail.com"],
      },
      ReplyToAddresses: [email],
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



