import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(_, { params }) {
    const { id } = params;

    try {
        await prisma.user.delete({ where: { id: Number(id) } });
        return Response.json({ message: 'Kullanıcı silindi' });
    } catch (error) {
        return Response.json({ error: 'Silme hatası' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    const { role } = body;

    try {
        const updated = await prisma.user.update({
            where: { id: Number(id) },
            data: { role },
        });

        const { password, ...userWithoutPassword } = updated;
        return Response.json({ user: userWithoutPassword });
    } catch (error) {
        return Response.json({ error: 'Güncelleme hatası' }, { status: 500 });
    }
}
