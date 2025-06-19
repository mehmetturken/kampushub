import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(_, { params }) {
    const userId = Number(params.id);

    const memberships = await prisma.membership.findMany({
        where: { userId },
        select: { communityId: true }
    });

    const membershipIds = memberships.map((m) => m.communityId);

    return Response.json({ membershipIds });
}
