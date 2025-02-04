import { NextResponse } from "next/server";
import { z } from "zod";
const nodemailer = require("nodemailer");
// Email validation schema
const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

export async function POST(req) {
  

  const body = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "panwargarvit31@gmail.com",
      pass: "furgmdbfzccxkkxc",
    },
  });

  const mailOptions = {
    from: "panwargarvit31@gmail.com",
    to: body.email,
    subject: "Subscription ",
    // text: `Hloo ${firstname} ${lastname}, your secret santa on this christmas is ${santaname}`,
    text: "You have successfull subscribed Garvit's Blog App",
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("email sent");
    return new Response(
      JSON.stringify({ message: "Awesome! You have successfully subscribed!" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
  }
}
