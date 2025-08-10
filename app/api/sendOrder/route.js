import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function POST(request) {
    try {
        const body = await request.json();
        const { inputs, items, total, delivery, code } = body;

        const client = await clientPromise;
        const db = client.db('test'); // Replace with your database name
        const collection = db.collection('Order'); // Replace with your collection name

        // Get the next oid
        const lastOrder = await collection.find().sort({ oid: -1 }).limit(1).toArray();
        const nextOid = lastOrder.length > 0 ? lastOrder[0].oid + 1 : 1000;

        // Format current date
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.toLocaleString('default', { month: 'long' })}/${currentDate.getFullYear()}`;

        // Insert the new order
        const result = await collection.insertOne({
            oid: nextOid, // 👈 Add oid here
            userInfo: items,
            cartItems: inputs,
            total: total,
            delivery: delivery + "",
            code: code,
            date: formattedDate,
        });

        return NextResponse.json({ success: true, insertedId: result.insertedId, oid: nextOid });
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }
}
