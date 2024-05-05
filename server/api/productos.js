import { PrismaClient } from '@prisma/client';
import { createError, defineEventHandler } from 'h3';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  return await getProductsAndPrices();
});

async function getProductsAndPrices() {
  try {
    const productos = await prisma.productos.findMany({
      take: 50 
    });

    const productosWithPrices = await Promise.all(
      productos.map(async (producto) => {
        const precio = await prisma.precio_producto.findFirst({
          where: { producto_id: producto.producto_id },
          orderBy: { fecha: 'desc' },
          select: { precio: true, almacen_id: true }
        });

        let nombreAlmacen = null;
        if (precio && precio.almacen_id) {
          const almacen = await prisma.almacenes.findUnique({
            where: { almacen_id: precio.almacen_id },
            select: { nombre: true }
          });
          nombreAlmacen = almacen ? almacen.nombre : null;
        }

        return { ...producto, precio: precio ? precio.precio : null, nombreAlmacen };
      })
    );

    return productosWithPrices;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}
