import { NextRequest, NextResponse } from 'next/server';
import { accounts, companies } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET Chart of Accounts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }
    
    const filteredAccounts = accounts.filter(a => a.company_id === companyId);
    return NextResponse.json(filteredAccounts.map(a => ({ ...a, company: companies.find(c => c.id === a.company_id) })));
  } catch (error: any) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

// POST new account (dummy - returns existing account)
export async function POST(request: NextRequest) {
  try {
    const { companyId, code, name, type, balance = 0 } = await request.json();
    
    if (!companyId || !code || !name || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ ...accounts[0], company: companies[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500 }
    );
  }
}
