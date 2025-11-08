import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await prisma.todo.deleteMany({});
  await prisma.todo.createMany({
    data: [
      { description: 'piedra del alma', complete: true },
      { description: 'piedra del poder' },
      { description: 'piedra del tiempo' },
      { description: 'piedra del espacio' },
      { description: 'piedra del realidad' },
    ],
  });
  return NextResponse.json({ message: 'Au' });
}
