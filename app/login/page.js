'use client';

import { useState } from 'react';
import { useAuth } from '../../context/auth-context';

export default function LoginPage() {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.error || 'Bir hata oluştu.');
                return;
            }

            login(result.user); // burada context ile oturumu başlatıyoruz
            alert('Giriş başarılı!');
        } catch (err) {
            alert('Sunucu hatası.');
        }
    };



    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-800">
            <form
                onSubmit={handleSubmit}
                className="bg-black p-8 rounded shadow-md w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold text-center text-blue-700">Giriş Yap</h1>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Şifre</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                >
                    Giriş Yap
                </button>
            </form>
        </main>
    );
}
