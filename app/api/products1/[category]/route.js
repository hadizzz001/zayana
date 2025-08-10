import clientPromise from '../../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { category } = params;
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    // Only return if category matches AND it's not "Pool Trays"
    const data = await collection.find({
      $and: [
        { category },
        { category: { $ne: 'Pool Trays' } }
      ]
    }).toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
