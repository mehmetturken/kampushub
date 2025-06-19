'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth-context';

export default function AdminCommunityPage() {
    const { user } = useAuth();
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            fetch('/api/admin/communities')
                .then((res) => res.json())
                .then((data) => setCommunities(data.communities));
        }
    }, [user]);

    if (!user) return <div className="p-6 text-center text-red-600">Giriş yapmalısınız.</div>;
    if (user.role !== 'ADMIN') return <div className="p-6 text-center text-red-600">Bu sayfa sadece adminler içindir.</div>;

    const handleApprove = async (id) => {
        const res = await fetch(`/api/admin/communities/${id}`, { method: 'PUT' });
        if (res.ok) {
            setCommunities(communities.filter((c) => c.id !== id));
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Silmek istediğinize emin misiniz?')) return;
        const res = await fetch(`/api/admin/communities/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setCommunities(communities.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Topluluk Onayı</h1>

            {communities.length === 0 ? (
                <p className="text-gray-600">Onay bekleyen topluluk yok.</p>
            ) : (
                <ul className="space-y-4">
                    {communities.map((c) => (
                        <li key={c.id} className="border-b pb-4">
                            <h2 className="text-lg font-semibold text-blue-700">{c.name}</h2>
                            <p>{c.description}</p>
                            <p className="text-sm text-gray-500">Oluşturan: {c.creator.name}</p>

                            <div className="mt-2 space-x-2">
                                <button
                                    onClick={() => handleApprove(c.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Onayla
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Sil
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
