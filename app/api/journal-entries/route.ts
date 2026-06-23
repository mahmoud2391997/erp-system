import { NextRequest, NextResponse } from 'next/server';
import { journalEntries, companies, accounts } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET journal entries (including invoices/payments)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const filteredEntries = companyId 
      ? journalEntries.filter(e => e.company_id === companyId)
      : journalEntries;
    
    return NextResponse.json(filteredEntries.map(e => ({ ...e, company: companies.find(c => c.id === e.company_id), lines: e.lines.map(l => ({ ...l, account: accounts.find(a => a.id === l.account_id) })) })));
  } catch (error: any) {
    console.error('Error fetching journal entries:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch journal entries' },
      { status: 500 }
    );
  }
}

// POST new journal entry (dummy - returns existing entry)
export async function POST(request: NextRequest) {
  try {
    const { companyId, date, reference, description, lines, status } = await request.json();
    
    if (!companyId || !date || !lines || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: companyId, date, and lines array' },
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

// PUT update journal entry (dummy - returns existing entry)
export async function PUT(request: NextRequest) {
  try {
    const { id, date, reference, description, lines } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }
    
    const entry = journalEntries.find(e => e.id === id);
    if (!entry) {
      return NextResponse.json({ error: 'Journal entry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...entry, company: companies[0] });
  } catch (error: any) {
    console.error('Error updating journal entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update journal entry' },
      { status: 500 }
    );
  }
}

// DELETE journal entry (dummy - returns success)
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
    console.error('Error deleting journal entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete journal entry' },
      { status: 500 }
    );
  }
}
