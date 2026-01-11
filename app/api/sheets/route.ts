import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica de datos
    if (!body.fecha || !body.tipo || !body.categoria || !body.monto) {
      return NextResponse.json(
        { result: "error", error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Enviar a Google Sheets
    const response = await fetch(process.env.NEXT_PUBLIC_SHEETS_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en API Route:", error);
    return NextResponse.json(
      { result: "error", error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
