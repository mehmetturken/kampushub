import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const pending = await prisma.community.findMany({
        where: { isApproved: false },
        include: { creator: true },
        orderBy: { createdAt: 'desc' },
    });

    return Response.json({ communities: pending });
}
