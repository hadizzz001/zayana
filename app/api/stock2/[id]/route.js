import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PATCH(request) {
  const { id, color, size, qty } = await request.json(); // Expecting id, color, size, and qty in body

  console.log("id, color, size, qty: ", id, color, size, qty);

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const quantityToDecrease = parseInt(qty, 10);
    if (!id || !color || !size || isNaN(quantityToDecrease)) {
      return NextResponse.json({ error: "Missing or invalid id, color, size, or qty" }, { status: 400 });
    }

    const objectId = new ObjectId(id);

    // Check current stock first
    const product = await collection.findOne(
      { _id: objectId },
      { projection: { color: 1 } }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const colorEntry = product.color.find(c => c.color === color);
    if (!colorEntry) {
      return NextResponse.json({ error: "Color not found" }, { status: 404 });
    }

    const sizeEntry = colorEntry.sizes.find(s => s.size === size);
    if (!sizeEntry) {
      return NextResponse.json({ error: "Size not found for this color" }, { status: 404 });
    }

    if (sizeEntry.qty < quantityToDecrease) {
      return NextResponse.json({ error: "Insufficient stock for this size" }, { status: 400 });
    }

    // Decrease the quantity using arrayFilters
    const result = await collection.updateOne(
      { _id: objectId },
      {
        $inc: { "color.$[c].sizes.$[s].qty": -quantityToDecrease }
      },
      {
        arrayFilters: [
          { "c.color": color },
          { "s.size": size }
        ]
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update quantity" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error updating color and size quantity:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



export async function GET(request, { params }) {
  // Expecting params.id like "productId,color,size"
  const [id, color, size] = params.id.split(','); 

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("Product");

    // Find the product by _id only, get the color array
    const product = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { color: 1 } }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Find the color entry
    const colorEntry = product.color.find(c => c.color === color);
    if (!colorEntry) {
      return NextResponse.json({ error: "Color not available" }, { status: 404 });
    }

    // Find the size entry inside the color's sizes array
    const sizeEntry = colorEntry.sizes.find(s => s.size === size);
    if (!sizeEntry) {
      return NextResponse.json({ error: "Size not available for this color" }, { status: 404 });
    }

    // Return the quantity for the specified color and size
    return NextResponse.json({ qty: sizeEntry.qty }, { status: 200 });

  } catch (error) {
    console.error("Error fetching color and size quantity:", error);
    return NextResponse.json({ error: "Failed to fetch quantity" }, { status: 500 });
  }
}
