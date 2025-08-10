 
import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstname, lastname, email, phone, type, message } = body;
        const client = await clientPromise; // Connect to MongoDB
        const db = client.db('test'); // Replace with your database name
        const collection = db.collection('Order'); // Replace with your collection name

        // Use the sort method to order documents by 'id' in ascending order
        const data = await collection.create({
            data: {
                firstname,
                lastname,
                email,
                phone,
                type,
                message
            }
        });

        return NextResponse.json(data); // Return data as JSON
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
