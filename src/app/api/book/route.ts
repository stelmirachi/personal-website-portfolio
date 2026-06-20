import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, reason, date, time } = await request.json()

    if (!name || !email || !reason || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Parse the date and time (assuming local timezone of the user requesting)
    // Create an ISO string for Google Calendar template formatting
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour meeting

    // Google Calendar template dates must be in format YYYYMMDDTHHmmssZ (UTC)
    const formatGoogleDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const googleDates = `${formatGoogleDate(startDateTime)}/${formatGoogleDate(endDateTime)}`;

    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", `Meeting with ${name}`);
    url.searchParams.set("dates", googleDates);
    url.searchParams.set("details", `Email: ${email}\nReason: ${reason}`);
    url.searchParams.set("add", email);

    const approveLink = url.toString();

    // Send the email to the owner
    const { error } = await resend.emails.send({
      from: 'Portfolio Booking <onboarding@resend.dev>', 
      to: process.env.PERSONAL_EMAIL as string, 
      subject: `New Meeting Request from ${name}`,
      html: `
        <h2>New Meeting Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Requested Date:</strong> ${date}</p>
        <p><strong>Requested Time:</strong> ${time}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <br/>
        <a href="${approveLink}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Approve & Create Google Meet
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          Clicking this will open your Google Calendar with the guest added. Just click "Save" to send them the invite!
        </p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Request sent successfully' }, { status: 200 })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
