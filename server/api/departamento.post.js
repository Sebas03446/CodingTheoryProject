import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { readBody } from "h3";


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await  createState(body);
});
async function createState(body) {
  try {
    const { nombre, gobernante_id } = body;

    if (isNumeric(nombre)) {
      return {
        statusCode: 400,
        statusMessage: "El nombre no debe contener valores numéricos",
      };
    }

    const departamento = await prisma.departamento.create({
      data: {
        nombre,
        gobernante_id,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departamento),
    };
  } catch (error) {
    if(error.code === "P2002"){
      return { statusCode: 400, statusMessage: "No se puede repetir gobernante en dos municipios" };
    }
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}