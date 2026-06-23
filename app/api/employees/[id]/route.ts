import { NextRequest, NextResponse } from 'next/server';
import { employees, companies } from '../../../../lib/dummyData';

// PUT update employee (dummy - returns existing employee)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, salary, role, department, status } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }
    
    const employee = employees.find(e => e.id === id);
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...employee, company: companies.find(c => c.id === employee.company_id) });
  } catch (error: any) {
    console.error('Error updating employee:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update employee' },
      { status: 500 }
    );
  }
}

// DELETE employee (dummy - returns success)
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
    console.error('Error deleting employee:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete employee' },
      { status: 500 }
    );
  }
}
