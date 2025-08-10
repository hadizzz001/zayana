import clientPromise from '../../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
    const { id } = params;
    const { qty } = await request.json(); // Get qty from request body

    try {
        const client = await clientPromise;
        const db = client.db('test'); // Replace with your DB name
        const collection = db.collection('Product'); // Replace with your collection name

        // Find the product and ensure stock is a number
        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
 
        // Convert stock to a number if it's stored as a string
        const currentStock = parseInt(product.stock, 10);
        const quantityToDecrease = parseInt(qty, 10);

        if (isNaN(currentStock) || isNaN(quantityToDecrease)) {
            return NextResponse.json({ error: "Invalid stock or quantity" }, { status: 400 });
        }

        if (currentStock < quantityToDecrease) {
            return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
        }

        // Update stock by decrementing the quantity
        const updatedProduct = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { stock: (currentStock - quantityToDecrease).toString() } }, // Store as a string again if needed
            { returnDocument: "after" }
        );

        return NextResponse.json({ success: true, product: updatedProduct });

    } catch (error) {
        console.error("Error updating stock:", error);
        return NextResponse.json({ error: "Failed to update stock" }, { status: 500 });
    }
}






export async function GET(request, { params }) {
    const { id } = params;  
  
    try {
      const client = await clientPromise; // Connect to MongoDB
      const db = client.db("test"); // Replace with your database name
      const collection = db.collection("Product"); // Replace with your collection name
  
      // Fetch product by ID and ensure stock is returned as a number
      const product = await collection.findOne(
        { _id: new ObjectId(id) }, 
        { projection: { stock: 1 } } // Only fetch the stock field
      );
  
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      // Ensure stock is converted to an integer
      const stock = parseInt(product.stock, 10);
  
      if (isNaN(stock)) {
        return NextResponse.json({ error: "Invalid stock value" }, { status: 400 });
      }
  
      return NextResponse.json({ stock });
    } catch (error) {
      console.error("Error fetching stock:", error);
      return NextResponse.json({ error: "Failed to fetch stock" }, { status: 500 });
    }
  }