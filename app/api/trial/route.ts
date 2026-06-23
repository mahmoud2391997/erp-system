import { NextRequest, NextResponse } from 'next/server';
import { accounts } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET Trial Balance
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
    const trialBalance = filteredAccounts.map(account => ({
      account: account.code,
      name: account.name,
      type: account.type,
      balance: account.balance
    }));
    
    return NextResponse.json(trialBalance);
  } catch (error: any) {
    console.error('Error generating trial balance:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate trial balance' },
      { status: 500 }
    );
  }
}
