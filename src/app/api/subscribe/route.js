import { z } from "zod";

// Email validation schema
const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate the email
    const emailValidation = EmailSchema.safeParse(body.email);
    if (!emailValidation.success) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Retrieve Mailchimp credentials
    const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
    const API_SERVER = process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER;
    const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;

    if (!API_KEY || !API_SERVER || !AUDIENCE_ID) {
      return new Response(
        JSON.stringify({
          error: "Server configuration error. Missing Mailchimp credentials.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Construct the Mailchimp API request URL
    const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    // Prepare request data
    const data = {
      email_address: emailValidation.data,
      status: "subscribed",
    };

    // Set request headers
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString(
          "base64"
        )}`,
      },
      body: JSON.stringify(data),
    };

    // Send POST request to Mailchimp API
    const response = await fetch(url, options);

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: "Awesome! You have successfully subscribed!" }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle known Mailchimp errors
    const errorResponse = await response.json();
    if (errorResponse.title === "Member Exists") {
      return new Response(
        JSON.stringify({
          error: "Uh oh, it looks like this email's already subscribed🧐",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Catch-all for other errors
    return new Response(
      JSON.stringify({
        error:
          "Oops! There was an error subscribing you to the newsletter. Please email me at ogbonnakell@gmail.com and I'll add you to the list.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in subscription handler:", error);
    return new Response(
      JSON.stringify({
        error:
          "An unexpected error occurred. Please try again later or contact support.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
