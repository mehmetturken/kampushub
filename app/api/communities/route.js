import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, creatorId } = body;

        const newCommunity = await prisma.community.create({
            data: {
                name,
                description,
                creatorId,
                isApproved: false,
            },
        });

        return Response.json({ message: 'Topluluk oluşturuldu', community: newCommunity });
    } catch (error) {
        console.error('Topluluk oluşturma hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const communities = await prisma.community.findMany({
            where: { isApproved: true },
            include: { creator: true },
            orderBy: { createdAt: 'desc' }
        });

        return Response.json({ communities });
    } catch (error) {
        console.error('Topluluk listeleme hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

