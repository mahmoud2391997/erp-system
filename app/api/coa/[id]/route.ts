import { NextRequest, NextResponse } from 'next/server';
import { accounts, companies } from '../../../../lib/dummyData';

// PUT update Account (dummy - returns existing account)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { code, name, type, balance, companyId } = await request.json();
    
    if (!id || !companyId) {
      return NextResponse.json(
        { error: 'Account ID and Company ID are required' },
        { status: 400 }
      );
    }
    
    const account = accounts.find(a => a.id === id);
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...account, company: companies.find(c => c.id === account.company_id) });
  } catch (error: any) {
    console.error('Error updating account:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update account' },
      { status: 500 }
    );
  }
}

// DELETE Account (dummy - returns success)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const url = new URL(request.url);
    const companyId = url.searchParams.get('companyId') || await request.json().then(body => body?.companyId).catch(() => null);
    
    if (!id || !companyId) {
      return NextResponse.json(
        { error: 'Account ID and Company ID are required' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete account' },
      { status: 500 }
    );
  }
}
