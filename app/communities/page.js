'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';

export default function CommunitiesPage() {
    const { user } = useAuth();
    const [communities, setCommunities] = useState([]);
    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        fetch('/api/communities')
            .then((res) => res.json())
            .then((data) => setCommunities(data.communities));
    }, []);

    useEffect(() => {
        if (user) {
            fetch(`/api/user/${user.id}/memberships`)
                .then((res) => res.json())
                .then((data) => setMemberships(data.membershipIds));
        }
    }, [user]);

    const isMember = (communityId) => memberships.includes(communityId);

    const handleJoin = async (communityId) => {
        console.log('Katıl butonuna tıklandı:', communityId);

        const res = await fetch('/api/membership', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                communityId: communityId,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || 'Katılma başarısız.');
            return;
        }

        setMemberships([...memberships, communityId]);
    };




    const handleLeave = async (communityId) => {
        const res = await fetch('/api/membership', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, communityId }),
        });

        if (res.ok) {
            setMemberships(memberships.filter((id) => id !== communityId));
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Topluluklar</h1>

            {communities.length === 0 ? (
                <p className="text-gray-600">Henüz topluluk yok.</p>
            ) : (
                <ul className="space-y-6">
                    {communities.map((c) => (
                        <li key={c.id} className="border-b pb-4">
                            <h2 className="text-xl font-semibold text-blue-600">{c.name}</h2>
                            <p className="text-gray-700">{c.description}</p>
                            <p className="text-sm text-gray-500">
                                Oluşturan: {c.creator.name} • {new Date(c.createdAt).toLocaleDateString()}
                            </p>

                            {user && (
                                <div className="mt-2">
                                    {isMember(c.id) ? (
                                        <button
                                            onClick={() => handleLeave(c.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                                        >
                                            Ayrıl
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleJoin(c.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                                        >
                                            Katıl
                                        </button>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
