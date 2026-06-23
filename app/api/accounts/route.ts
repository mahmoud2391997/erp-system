import { NextRequest, NextResponse } from 'next/server';
import { accounts, companies } from '../../../lib/dummyData';
import { AccountType } from '../../../types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET accounts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const id = searchParams.get('id');
    
    if (id) {
      const account = accounts.find(a => a.id === id);
      if (!account) {
        return NextResponse.json({ error: 'Account not found' }, { status: 404 });
      }
      return NextResponse.json({ ...account, company: companies.find(c => c.id === account.company_id) });
    }
    
    const filteredAccounts = companyId 
      ? accounts.filter(a => a.company_id === companyId)
      : accounts;
    
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
    const { companyId, name, code, type, balance } = await request.json();
    
    if (!companyId || !name || !code || !type) {
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

// PUT update account (dummy - returns existing account)
export async function PUT(request: NextRequest) {
  try {
    const { id, name, code, type, balance } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }
    
    const account = accounts.find(a => a.id === id);
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...account, company: companies[0] });
  } catch (error: any) {
    console.error('Error updating account:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update account' },
      { status: 500 }
    );
  }
}

// DELETE account (dummy - returns success)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete account' },
      { status: 500 }
    );
  }
}
