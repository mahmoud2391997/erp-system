import { NextRequest, NextResponse } from 'next/server';
import { journalEntries, companies, accounts } from '../../../../lib/dummyData';

// PUT update Journal Entry (dummy - returns existing entry)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { companyId, date, reference, description, lines } = await request.json();
    
    if (!id || !companyId) {
      return NextResponse.json(
        { error: 'Entry ID and Company ID are required' },
        { status: 400 }
      );
    }
    
    const entry = journalEntries.find(e => e.id === id);
    if (!entry) {
      return NextResponse.json({ error: 'Journal entry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...entry, company: companies.find(c => c.id === entry.company_id), lines: entry.lines.map(l => ({ ...l, account: accounts.find(a => a.id === l.account_id) })) });
  } catch (error: any) {
    console.error('Error updating journal entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update journal entry' },
      { status: 500 }
    );
  }
}

// DELETE Journal Entry (dummy - returns success)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const url = new URL(request.url);
    const companyId = url.searchParams.get('companyId') || await request.json().then(body => body?.companyId).catch(() => null);
    
    if (!id || !companyId) {
      return NextResponse.json(
        { error: 'Entry ID and Company ID are required' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting journal entry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete journal entry' },
      { status: 500 }
    );
  }
}
