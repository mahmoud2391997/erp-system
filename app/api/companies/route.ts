import { NextRequest, NextResponse } from 'next/server';
import { companies } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET companies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    
    if (id) {
      const company = companies.find(c => c.id === id);
      if (!company) {
        return NextResponse.json({ error: 'Company not found' }, { status: 404 });
      }
      return NextResponse.json(company);
    }
    
    if (email) {
      return NextResponse.json(companies);
    }
    
    return NextResponse.json(companies);
  } catch (error: any) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

// POST new company (dummy - returns existing company)
export async function POST(request: NextRequest) {
  try {
    const { name, adminEmail } = await request.json();
    
    if (!name || !adminEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(companies[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create company' },
      { status: 500 }
    );
  }
}
