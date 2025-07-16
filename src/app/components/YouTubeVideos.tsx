'use client';

import { useState, useEffect } from 'react';
import { YouTubeVideo } from '@/types';

export default function YouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const response = await fetch('/api/youtube');
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const data = await response.json();
        setVideos(data.videos);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p>Carregando vídeos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p>Nenhum vídeo encontrado.</p>
      </div>
    );
  }

  // Get the latest video (first in the array since they're ordered by date)
  const latestVideo = videos[0];
  // Get the rest of the videos
  const otherVideos = videos.slice(1);

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Vídeos do Canal</h2>
      
      {/* Latest video featured prominently */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Último Vídeo</h3>
        <div className="bg-white p-4 shadow rounded">
          <div className="aspect-video mb-4">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${latestVideo.id}`}
              title={latestVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded"
            ></iframe>
          </div>
          <h4 className="text-lg font-semibold">{latestVideo.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{latestVideo.description}</p>
          <p className="text-xs text-gray-500 mt-2">
            Publicado em: {new Date(latestVideo.publishedAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
      
      {/* Other videos */}
      {otherVideos.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Mais Vídeos</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {otherVideos.map((video) => (
              <div key={video.id} className="bg-white p-4 shadow rounded">
                <div className="aspect-video mb-2">
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover rounded"
                    />
                  </a>
                </div>
                <h4 className="font-semibold text-sm">{video.title}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(video.publishedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}