export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-800 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">KampusHub</h1>
        <p className="text-lg mb-6">
          KampusHub, üniversite öğrencileri için hazırlanmış bir kampüs içi iletişim ve topluluk platformudur.
        </p>
        <p className="mb-4">
          Bu platformda öğrenci topluluklarına katılabilir, yeni kulüpler oluşturabilir, diğer öğrencilerle mesajlaşabilir ve topluluk etkinliklerinden haberdar olabilirsin.
        </p>
        <p className="mb-6">
          Admin kullanıcılar sistemdeki tüm kullanıcıları yönetebilir, toplulukları denetleyebilir ve rol atamaları yapabilir.
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Hemen Başla
        </a>
      </div>
    </main>
  );
}
