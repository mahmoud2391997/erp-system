import { NextRequest, NextResponse } from 'next/server';
import { activeModules } from '../../../../../../lib/dummyData';

// POST - Activate a module for a company (dummy - returns success)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; module: string } }
) {
  try {
    const { id, module } = params;

    if (!id || !module) {
      return NextResponse.json(
        { error: 'Company ID and module name are required' },
        { status: 400 }
      );
    }

    const existingModule = activeModules.find(
      m => m.company_id === id && m.module_name === module
    );

    if (existingModule) {
      return NextResponse.json(
        { error: 'Module is already active' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Module activated successfully', activeModule: { company_id: id, module_name: module } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error activating module:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to activate module' },
      { status: 500 }
    );
  }
}

// DELETE - Deactivate a module for a company (dummy - returns success)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; module: string } }
) {
  try {
    const { id, module } = params;

    if (!id || !module) {
      return NextResponse.json(
        { error: 'Company ID and module name are required' },
        { status: 400 }
      );
    }

    const existingModule = activeModules.find(
      m => m.company_id === id && m.module_name === module
    );

    if (!existingModule) {
      return NextResponse.json(
        { error: 'Module is not active' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Module deactivated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deactivating module:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to deactivate module' },
      { status: 500 }
    );
  }
}
