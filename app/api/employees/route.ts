
import { NextRequest, NextResponse } from 'next/server';
import { employees, companies } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET employees
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const filteredEmployees = companyId 
      ? employees.filter(e => e.company_id === companyId)
      : employees;
    
    return NextResponse.json(filteredEmployees.map(e => ({ ...e, company: companies.find(c => c.id === e.company_id) })));
  } catch (error: any) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

// POST new employee (dummy - returns existing employee)
export async function POST(request: NextRequest) {
  try {
    const { companyId, name, salary, role, department, status } = await request.json();
    
    if (!companyId || !name || !salary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ ...employees[0], company: companies[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create employee' },
      { status: 500 }
    );
  }
}
