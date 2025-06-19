import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { senderId, receiverId, content } = body;

        if (!senderId || !receiverId || !content) {
            return Response.json({ error: 'Eksik veri' }, { status: 400 });
        }

        const message = await prisma.message.create({
            data: {
                senderId: Number(senderId),
                receiverId: Number(receiverId),
                content,
            },
        });

        return Response.json({ message });
    } catch (error) {
        console.error('Mesaj gönderme hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
