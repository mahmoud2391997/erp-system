import { NextRequest, NextResponse } from 'next/server';
import { activeModules } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET active modules
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    
    const filteredModules = companyId 
      ? activeModules.filter(m => m.company_id === companyId)
      : activeModules;
    
    return NextResponse.json(filteredModules);
  } catch (error: any) {
    console.error('Error fetching active modules:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch active modules' },
      { status: 500 }
    );
  }
}

// POST new active module (dummy - returns existing module)
export async function POST(request: NextRequest) {
  try {
    const { companyId, moduleName } = await request.json();
    
    if (!companyId || !moduleName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(activeModules[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating active module:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create active module' },
      { status: 500 }
    );
  }
}
