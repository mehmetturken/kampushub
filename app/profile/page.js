'use client';

import { useState } from 'react';
import { useAuth } from '../../context/auth-context';

export default function ProfilePage() {
    const { user, login } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [password, setPassword] = useState('');

    if (!user) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                Bu sayfayı görüntülemek için giriş yapmalısınız.
            </div>
        );
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id, name, password }),
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.error || 'Güncelleme başarısız.');
            return;
        }

        alert('Bilgiler güncellendi.');

        // Yeni veriyi auth context’e de kaydet
        login(result.user);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Profil Bilgilerini Güncelle</h1>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block mb-1 text-black">Adınız</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded text-gray-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-black">Yeni Şifre (isteğe bağlı)</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded text-gray-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Boş bırakılırsa değişiklik yapılamaz."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                >
                    Bilgileri Güncelle
                </button>
            </form>
        </div>
    );
}
