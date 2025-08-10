import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const search = searchParams.get('q');
    const cat = searchParams.get('cat'); 

    // Build MongoDB query
    const query = { category: { $ne: 'Pool Trays' } }; // Always exclude 'Pool Trays'

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    if (cat) {
      if (cat === 'yes') {
        query.arrival = 'yes';
      } else {
        query.category = { 
          $regex: `^${cat}$`, 
          $options: 'i', 
          $ne: 'Pool Trays' // Combine regex and exclusion
        };
      }
    }

    const total = await collection.countDocuments(query);
    const data = await collection.find(query).skip(skip).limit(limit).toArray();

    return NextResponse.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products: data,
    });

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
