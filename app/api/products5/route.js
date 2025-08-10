import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET() { 
  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Product'); // Replace with your collection name

    const data = await collection.find({  
      arrival: "yes" 
    })
    .sort({ _id: -1 }) // Sort by newest first
    .toArray(); // Fetch all documents

    return NextResponse.json(data); // Return data as JSON
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
