import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PUT(_, { params }) {
    const { id } = params;

    const updated = await prisma.community.update({
        where: { id: Number(id) },
        data: { isApproved: true },
    });

    return Response.json({ community: updated });
}

export async function DELETE(_, { params }) {
    const { id } = params;

    await prisma.community.delete({
        where: { id: Number(id) },
    });

    return Response.json({ message: 'Topluluk silindi' });
}
