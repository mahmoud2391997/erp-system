
import { NextRequest, NextResponse } from 'next/server';
import { leads, companies } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const filteredLeads = companyId 
      ? leads.filter(l => l.company_id === companyId)
      : leads;
    
    return NextResponse.json(filteredLeads.map(l => ({ ...l, company: companies.find(c => c.id === l.company_id) })));
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST new lead (dummy - returns existing lead)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyId, name, company, value, stage, chance } = body;
    
    if (!companyId || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ ...leads[0], company: companies[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create lead' },
      { status: 500 }
    );
  }
}
