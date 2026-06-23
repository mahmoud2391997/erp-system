import { NextRequest, NextResponse } from 'next/server';
import { products, companies } from '../../../lib/dummyData';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const id = searchParams.get('id');
    
    if (id) {
      const product = products.find(p => p.id === id);
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ ...product, company: companies.find(c => c.id === product.company_id) });
    }
    
    const filteredProducts = companyId 
      ? products.filter(p => p.company_id === companyId)
      : products;
    
    return NextResponse.json(filteredProducts.map(p => ({ ...p, company: companies.find(c => c.id === p.company_id) })));
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product (dummy - returns existing product)
export async function POST(request: NextRequest) {
  try {
    const { companyId, name, sku, price, stock, category } = await request.json();
    
    if (!companyId || !name || !sku || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ ...products[0], company: companies[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PUT update product (dummy - returns existing product)
export async function PUT(request: NextRequest) {
  try {
    const { id, name, sku, price, stock, category } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 }
      );
    }
    
    const product = products.find(p => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...product, company: companies[0] });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product (dummy - returns success)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}
