# Aplikasi Silsilah Keluarga

Aplikasi web interaktif untuk memvisualisasikan dan mengelola silsilah keluarga.

## Fitur

- Visualisasi pohon keluarga yang interaktif
- Detail informasi anggota keluarga
- Panel admin untuk mengelola data
- Autentikasi pengguna
- Responsive design

## Teknologi yang Digunakan

### Backend
- Node.js
- Express.js
- MongoDB
- JWT untuk autentikasi

### Frontend
- React.js
- Material-UI
- React Force Graph untuk visualisasi
- Axios untuk HTTP requests

## Instalasi

1. Clone repository
```bash
git clone (https://github.com/yeheskieltame/Family-Tree.git)
cd family-tree-app
```

2. Install dependensi backend
```bash
npm install
```

3. Install dependensi frontend
```bash
cd client
npm install
```

4. Buat file .env di root directory dengan konfigurasi berikut:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/family-tree
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

5. Jalankan MongoDB
```bash
mongod
```

6. Jalankan aplikasi
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

## Penggunaan

1. Buka browser dan akses `http://localhost:3000`
2. Untuk mengakses panel admin, login di `http://localhost:3000/login`
3. Gunakan panel admin untuk menambah, mengedit, atau menghapus anggota keluarga
4. Visualisasi pohon keluarga akan otomatis diperbarui

## Struktur Database

### FamilyMember
- name: String (required)
- photo: String
- birthDate: Date
- deathDate: Date
- gender: String (enum: 'male', 'female')
- biography: String
- contactInfo: {
  email: String,
  phone: String,
  address: String
}
- relationships: [{
  type: String (enum: 'spouse', 'parent', 'child', 'sibling'),
  memberId: ObjectId (ref: 'FamilyMember')
}]

### User
- username: String (required, unique)
- email: String (required, unique)
- password: String (required)
- isAdmin: Boolean
- createdAt: Date

## Deployment

1. Build frontend
```bash
cd client
npm run build
```

2. Set environment variables di server production
```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
NODE_ENV=production
```

3. Jalankan server
```bash
npm start
```

## Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

MIT License 
