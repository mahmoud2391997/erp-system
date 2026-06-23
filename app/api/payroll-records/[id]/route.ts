import { NextRequest, NextResponse } from 'next/server';
import { payrollRecords, employees, companies } from '../../../../lib/dummyData';

// PUT update payroll record (dummy - returns existing record)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { employeeId, month, amount, status, paymentDate } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }
    
    const record = payrollRecords.find(r => r.id === id);
    if (!record) {
      return NextResponse.json({ error: 'Payroll record not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...record, company: companies.find(c => c.id === record.company_id), employee: employees.find(e => e.id === record.employee_id) });
  } catch (error: any) {
    console.error('Error updating payroll record:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update payroll record' },
      { status: 500 }
    );
  }
}

// DELETE payroll record (dummy - returns success)
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
    console.error('Error deleting payroll record:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete payroll record' },
      { status: 500 }
    );
  }
}
