'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../../context/auth-context';

export default function CreateCommunityPage() {
    const { user } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    if (!user) {
        return <div className="p-6 text-center text-red-600">Giriş yapmalısınız.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/communities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                creatorId: user.id,
            }),
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.error || 'Bir hata oluştu.');
            return;
        }

        alert('Topluluk başarıyla oluşturuldu! Admin onayı bekleniyor.');
        router.push('/communities');
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Topluluk Oluştur</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-black">Topluluk Adı</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded text-gray-800"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-black">Açıklama</label>
                    <textarea
                        className="w-full border px-3 py-2 rounded text-gray-800"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                >
                    Oluştur
                </button>
            </form>
        </div>
    );
}
