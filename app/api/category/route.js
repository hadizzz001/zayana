import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET() {
  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Category'); // Replace with your collection name

    // Filter out 'Pool Trays' and sort by 'id' ascending
    const data = await collection
      .find({ name: { $ne: 'Pool Trays' } }) // Adjust 'name' if the category field has a different key
      .sort({ id: 1 })
      .toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
