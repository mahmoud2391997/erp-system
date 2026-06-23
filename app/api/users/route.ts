import { NextRequest, NextResponse } from 'next/server';
import { users, companies } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const user = users.find(u => u.id === id);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    }
    
    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST new user registration (dummy - returns existing user)
export async function POST(request: NextRequest) {
  try {
    const { name, email, password, companyName } = await request.json();

    if (!name || !email || !password || !companyName) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Return dummy user and company
    return NextResponse.json(
      { user: users[0], company: companies[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
