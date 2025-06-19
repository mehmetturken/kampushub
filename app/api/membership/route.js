import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, communityId } = body;

        const existing = await prisma.membership.findFirst({
            where: { userId, communityId },
        });

        if (existing) {
            return Response.json({ error: 'Zaten üyesiniz.' }, { status: 400 });
        }

        const membership = await prisma.membership.create({
            data: { userId, communityId },
        });

        return Response.json({ message: 'Katıldınız.', membership });
    } catch (error) {
        console.error('Katılma hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { userId, communityId } = body;

        await prisma.membership.deleteMany({
            where: { userId, communityId },
        });

        return Response.json({ message: 'Ayrıldınız.' });
    } catch (error) {
        console.error('Ayrılma hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
