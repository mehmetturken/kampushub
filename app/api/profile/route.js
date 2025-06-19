import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, name, password } = body;

        let updatedData = { name };

        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updatedData,
        });

        // Şifreyi geri göndermiyoruz (güvenlik)
        const { password: _, ...userWithoutPassword } = updatedUser;

        return Response.json({ message: 'Profil güncellendi', user: userWithoutPassword });
    } catch (error) {
        console.error('Profil güncelleme hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
