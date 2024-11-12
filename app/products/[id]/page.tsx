import Image from 'next/image'
import prisma from '@/lib/prisma'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <Image src={product.imageUrl} alt={product.name} width={600} height={400} className="w-full rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}