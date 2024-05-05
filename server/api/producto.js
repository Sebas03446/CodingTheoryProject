import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query || !query.producto_id) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request"
    });
  }

 const productoId = parseInt(query.producto_id, 10);

  if (isNaN(productoId)) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid product ID"
    });
  }

  return await getProductById(productoId);
});

async function getProductById(productoId) {
  try {
    const producto = await prisma.productos.findUnique({
      where: { producto_id: productoId },
    });

    if (!producto) {
      return createError({
        statusCode: 404,
        statusMessage: "Product not found"
      });
    }

    const precio = await prisma.precio_producto.findFirst({
      where: { producto_id: productoId },
      orderBy: { fecha: 'desc' }, 
      select: {
        precio: true,
        almacen_id: true 
      }
    });

    if (!precio) {
      return createError({
        statusCode: 404,
        statusMessage: "Price not found for the product"
      });
    }

    return { producto, precio };
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}
