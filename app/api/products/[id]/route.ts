import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET product by ID
export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const id = parseInt(searchParams.get("id") as string);

   if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
   }

   const product = await prisma.product.findUnique({
      where: { id },
   });

   if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
   }

   return NextResponse.json(product);
}

// Update product by ID
export async function PUT(request: Request) {
   const { searchParams } = new URL(request.url);
   const id = parseInt(searchParams.get("id") as string);

   if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
   }

   const json = await request.json();

   const updatedProduct = await prisma.product.update({
      where: { id },
      data: json,
   });

   return NextResponse.json(updatedProduct);
}

// Delete product by ID
export async function DELETE(request: Request) {
   const { searchParams } = new URL(request.url);
   const id = parseInt(searchParams.get("id") as string);

   if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
   }

   await prisma.product.delete({
      where: { id },
   });

   return NextResponse.json({ message: "Product deleted successfully" });
}
