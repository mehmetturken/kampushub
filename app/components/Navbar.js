'use client';

import Link from 'next/link';
import { useAuth } from '../../context/auth-context';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">KampusHub</Link>

            <div className="space-x-4 text-sm flex items-center">
                {!user ? (
                    <>
                        <Link href="/login" className="hover:underline">Giriş</Link>
                        <Link href="/register" className="hover:underline">Kayıt Ol</Link>
                    </>
                ) : (
                    <>
                        <Link href="/profile" className="hover:underline">Profil</Link>
                        <Link href="/communities" className="hover:underline">Topluluklar</Link>
                        <Link href="/communities/create" className="hover:underline">Topluluk Oluştur</Link>
                        <Link href="/messages" className="hover:underline">Mesajlar</Link>

                        {user.role === 'ADMIN' && (
                            <>
                                <Link href="/admin" className="hover:underline">Admin Paneli</Link>
                                <Link href="/admin/communities" className="hover:underline">Topluluk Onayı</Link>
                            </>
                        )}

                        <button
                            onClick={logout}
                            className="ml-2 px-3 py-1 bg-white text-blue-700 rounded hover:bg-gray-200"
                        >
                            Çıkış Yap
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
