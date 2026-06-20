import { NextResponse } from 'next/server' // web response API
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // require email to subscribe to newsletter
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // insert email into database
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])

    // handle errors from inserting email into database
    if (error) {
      if (error.code === '23505') { // Postgres code for unique violation
        return NextResponse.json({ error: 'You are already subscribed!' }, { status: 400 })
      }
      throw error
    }

    return NextResponse.json({ message: 'Successfully subscribed' }, { status: 200 })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
