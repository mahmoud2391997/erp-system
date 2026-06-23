import { NextRequest, NextResponse } from 'next/server';
import { payrollRecords } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET payroll records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const filteredRecords = companyId 
      ? payrollRecords.filter(r => r.company_id === companyId)
      : payrollRecords;
    
    return NextResponse.json(filteredRecords);
  } catch (error: any) {
    console.error('Error fetching payroll records:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch payroll records' },
      { status: 500 }
    );
  }
}

// POST new payroll record (dummy - returns existing record)
export async function POST(request: NextRequest) {
  try {
    const { companyId, employeeId, month, amount, status, paymentDate } = await request.json();
    
    if (!companyId || !employeeId || !month || !amount || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(payrollRecords[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating payroll record:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payroll record' },
      { status: 500 }
    );
  }
}
