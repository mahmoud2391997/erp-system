import { NextRequest, NextResponse } from 'next/server';
import { warehouses, companies } from '../../../../lib/dummyData';

// PUT update warehouse (dummy - returns existing warehouse)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, location } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }
    
    const warehouse = warehouses.find(w => w.id === id);
    if (!warehouse) {
      return NextResponse.json({ error: 'Warehouse not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...warehouse, company: companies.find(c => c.id === warehouse.company_id) });
  } catch (error: any) {
    console.error('Error updating warehouse:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update warehouse' },
      { status: 500 }
    );
  }
}

// DELETE warehouse (dummy - returns success)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting warehouse:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete warehouse' },
      { status: 500 }
    );
  }
}
