import { NextRequest, NextResponse } from 'next/server';
import { journalEntries, companies, accounts } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET Journal Entries
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
    
    const filteredEntries = journalEntries.filter(e => e.company_id === companyId);
    return NextResponse.json(filteredEntries.map(e => ({ ...e, company: companies.find(c => c.id === e.company_id), lines: e.lines.map(l => ({ ...l, account: accounts.find(a => a.id === l.account_id) })) })));
  } catch (error: any) {
    console.error('Error fetching journal entries:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch journal entries' },
      { status: 500 }
    );
  }
}

// POST new Journal Entry (dummy - returns existing entry)
export async function POST(request: NextRequest) {
  try {
    const { companyId, date, reference, description, lines } = await request.json();
    
    if (!companyId || !date || !lines || !Array.isArray(lines)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ ...journalEntries[0], company: companies[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating journal entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create journal entry' },
      { status: 500 }
    );
  }
}

