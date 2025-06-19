'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';

export default function MessagesPage() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Kullanıcı listesini al
    useEffect(() => {
        if (!user) return;
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => {
                const filtered = data.users.filter(u => u.id !== user.id);
                setUsers(filtered);
            });
    }, [user]);

    // Seçilen kullanıcıya ait mesajları getir
    useEffect(() => {
        if (!user?.id || !receiverId) return;

        fetch(`/api/messages/${receiverId}?senderId=${user.id}`)
            .then(res => res.json())
            .then(data => setMessages(data.messages || []))
            .catch(err => console.error('Mesajlar alınamadı:', err));
    }, [receiverId, user]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderId: user.id,
                receiverId: Number(receiverId),
                content: newMessage,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || 'Mesaj gönderilemedi');
            return;
        }

        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
    };

    if (!user) {
        return <div className="p-6 text-red-600 text-center">Lütfen giriş yapın.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow text-black">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Mesajlaşma</h1>

            <div className="mb-4">
                <label className="block mb-1">Bir kullanıcı seçin:</label>
                <select
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">-- Kullanıcı Seçin --</option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                </select>
            </div>

            {receiverId && (
                <>
                    <div className="bg-gray-100 p-4 mb-4 rounded h-64 overflow-y-scroll">
                        {messages.length === 0 ? (
                            <p className="text-gray-500">Mesaj yok.</p>
                        ) : (
                            messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`mb-2 ${m.senderId === user.id ? 'text-right' : 'text-left'}`}
                                >
                                    <span className="inline-block bg-blue-200 px-3 py-1 rounded">
                                        {m.content}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 border px-3 py-2 rounded"
                            placeholder="Mesaj yaz..."
                        />
                        <button
                            type="button"
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Gönder
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
