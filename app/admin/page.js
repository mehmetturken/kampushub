'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';

export default function AdminPage() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            fetch('/api/admin/users')
                .then((res) => res.json())
                .then((data) => setUsers(data.users))
                .catch((err) => console.error('Kullanıcılar alınamadı:', err));
        }
    }, [user]);

    if (!user) {
        return <div className="p-6 text-center text-red-600">Giriş yapmalısınız.</div>;
    }

    if (user.role !== 'ADMIN') {
        return <div className="p-6 text-center text-red-600">Bu sayfa yalnızca adminler içindir.</div>;
    }

    const deleteUser = async (id) => {
        if (confirm('Bu kullanıcıyı silmek istiyor musunuz?')) {
            const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setUsers(users.filter((u) => u.id !== id));
            }
        }
    };

    const toggleRole = async (id, currentRole) => {
        const res = await fetch(`/api/admin/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role: currentRole === 'ADMIN' ? 'USER' : 'ADMIN',
            }),
        });

        if (res.ok) {
            const updated = await res.json();
            setUsers(users.map((u) => (u.id === id ? updated.user : u)));
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-black rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Kullanıcı Yönetimi</h1>

            <table className="w-full text-left border">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-2">Ad</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-t">
                            <td className="p-2">{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => toggleRole(u.id, u.role)}
                                    className="px-2 py-1 bg-yellow-400 rounded text-sm"
                                    disabled={u.id === user.id}
                                >
                                    Rolü Değiştir
                                </button>
                                <button
                                    onClick={() => deleteUser(u.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                                    disabled={u.id === user.id}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
