import { NextResponse } from 'next/server';

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: 'not required (using dummy data)',
    timestamp: new Date().toISOString()
  });
}
