"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/belajar');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Selamat Datang! 🚀
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Project Next.js kamu sudah siap dengan Tailwind CSS
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card 
              title="📱 Responsive"
              description="Desain yang otomatis menyesuaikan di semua device"
            />
            <Card 
              title="⚡ Cepat"
              description="Next.js App Router untuk performa maksimal"
            />
            <Card 
              title="🎨 Tailwind"
              description="Styling yang mudah dan fleksibel"
            />
          </div>

          <button onClick={() => handleClick()} className="mt-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
            Mulai Sekarang
          </button>
        </div>
      </main>
    </div>
  );
}

function Card({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
