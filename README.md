# 🏫 KampusHub

KampusHub, üniversite öğrencileri için geliştirilen bir topluluk yönetimi ve mesajlaşma platformudur.  
Kullanıcılar platforma kayıt olabilir, topluluklara katılabilir, özel mesajlaşabilir ve rollerine göre farklı işlemler yapabilir.

## ✨ Özellikler

- 👤 Kayıt ve giriş sistemi (USER / ADMIN rolleri)
- 👥 Topluluk oluşturma, listeleme ve katılma
- 💬 Kullanıcılar arası özel mesajlaşma
- 🔐 Rol tabanlı erişim kontrolü
- 🛠️ Admin paneli (kullanıcı ve topluluk yönetimi)

## 🛠 Kullanılan Teknolojiler

| Katman         | Teknoloji           |
|----------------|---------------------|
| Frontend       | Next.js (App Router) |
| Backend (API)  | Next.js API Routes + Prisma |
| Veritabanı     | SQLite (Prisma ORM ile) |
| Stil           | Tailwind CSS        |
| Oturum Yönetimi | LocalStorage (JWT benzeri) |

## 🔧 Kurulum

### ⚠️ Önemli: aşağıdaki git clone adımından sonra `kampushub/.env` dosyası oluşturulmalı.

Proje klasöründeki `.env` dosyasına şu kodu ekleyin:
- DATABASE_URL="file:./dev.db"

```bash
git clone https://github.com/mehmetturken/kampushub.git
cd kampushub
npm install
npx prisma migrate dev --name init
npm run dev
```



## Prisma Studio ile veritabanını incelemek için:
```bash
npx prisma studio
```

## 📂 Önemli Sayfalar
- Sayfa	Açıklama
- /register	Yeni kullanıcı kaydı
- /login	Giriş ekranı
- /profile	Kullanıcı bilgileri
- /communities	Topluluk listesi
- /communities/create	Topluluk oluşturma
- /messages	Özel mesajlaşma ekranı
- /admin	Kullanıcı yönetimi (admin)
- /admin/communities	Topluluk onaylama (admin)

## 🔐 Rollere Göre Yetkiler
- USER → Topluluklara katılır, mesajlaşır, profilini düzenler

- ADMIN → Kullanıcıları yönetir, toplulukları onaylar

👨‍💻 Geliştirici

- Geliştirici: Mehmet Mücahit TÜRKEN
- Ders:  İnternet Programcılığı II
- Teslim: 20 Haziran 2025
