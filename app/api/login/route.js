import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return Response.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return Response.json({ error: 'Geçersiz şifre' }, { status: 401 });
        }

        // Giriş başarılı!
        return Response.json({ message: 'Giriş başarılı!', user });
    } catch (error) {
        console.error('Login API hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
