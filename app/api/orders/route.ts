import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL;
    if (!SCRIPT_URL) {
      return NextResponse.json({ error: 'Script URL not configured' }, { status: 500 });
    }

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to save to sheet' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    
    const SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL;
    if (!SCRIPT_URL) {
      return NextResponse.json({ error: 'Script URL not configured' }, { status: 500 });
    }

    const payload = {
      ...data,
      action: 'update_status'
    };

    const response = await fetch(SCRIPT_URL, {
      method: 'POST', // Apps Script only supports POST and GET
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to update sheet' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
