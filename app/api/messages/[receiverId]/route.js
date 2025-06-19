import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const receiverId = Number(params.receiverId);
    const url = new URL(request.url, 'http://localhost'); // base dummy url
    const senderId = Number(url.searchParams.get('senderId'));

    if (!senderId || !receiverId) {
        return Response.json({ error: 'Eksik parametre' }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        },
        orderBy: {
            timestamp: 'asc',
        },
    });

    return Response.json({ messages });
}
