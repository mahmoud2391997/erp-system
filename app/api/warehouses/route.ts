
import { NextRequest, NextResponse } from 'next/server';
import { warehouses, companies } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET warehouses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const filteredWarehouses = companyId 
      ? warehouses.filter(w => w.company_id === companyId)
      : warehouses;
    
    return NextResponse.json(filteredWarehouses.map(w => ({ ...w, company: companies.find(c => c.id === w.company_id) })));
  } catch (error: any) {
    console.error('Error fetching warehouses:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch warehouses' },
      { status: 500 }
    );
  }
}

// POST new warehouse (dummy - returns existing warehouse)
export async function POST(request: NextRequest) {
  try {
    const { companyId, name, location } = await request.json();
    
    if (!companyId || !name || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ ...warehouses[0], company: companies[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating warehouse:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create warehouse' },
      { status: 500 }
    );
  }
}
