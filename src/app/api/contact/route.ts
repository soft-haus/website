import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = "henriqueborgeshbr@proton.me";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();
    const { data, error } = await resend.emails.send({
      from: "Softhaus Contact <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New Message from ${name}`,
      replyTo: toEmail,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}