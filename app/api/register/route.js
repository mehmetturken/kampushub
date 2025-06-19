import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Email daha önce alınmış mı kontrol et
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return Response.json({ error: 'Bu email zaten kayıtlı.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        // Kullanıcıyı oluştur
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return Response.json({ message: 'Kayıt başarılı', user: newUser });
    } catch (error) {
        console.error('Kayıt API hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
