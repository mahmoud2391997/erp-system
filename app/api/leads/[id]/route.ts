
import { NextRequest, NextResponse } from 'next/server';
import { leads, companies } from '../../../../lib/dummyData';

// PUT update lead (dummy - returns existing lead)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, company, value, stage, chance } = body;
    
    const lead = leads.find(l => l.id === id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...lead, company: companies.find(c => c.id === lead.company_id) });
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE lead (dummy - returns success)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
