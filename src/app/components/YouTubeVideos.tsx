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
        
        const data = await response.json();
        
        if (!response.ok) {
          // Check if this is an environment variable error
          if (data.error && data.error.includes('YouTube API key or Channel ID is missing')) {
            throw new Error('Environment variables for YouTube API are missing. Please check your .env.local file.');
          } else {
            throw new Error('Failed to fetch videos');
          }
        }
        
        setVideos(data.videos);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to load videos. Please try again later.');
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
    const isEnvError = error.includes('Environment variables for YouTube API are missing');
    
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p className="text-red-500 font-semibold mb-2">{error}</p>
        
        {isEnvError && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 mt-2 rounded text-left">
            <h4 className="font-semibold text-yellow-800 mb-2">Developer Note:</h4>
            <ol className="list-decimal pl-5 text-sm text-yellow-700 space-y-1">
              <li>Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file in the project root if it doesn&apos;t exist</li>
              <li>Add the following variables to the file:
                <pre className="bg-yellow-100 p-2 mt-1 rounded overflow-x-auto">
                  YOUTUBE_API_KEY=your_youtube_api_key_here{'\n'}
                  YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here
                </pre>
              </li>
              <li>Restart the development server</li>
            </ol>
            <p className="text-xs text-yellow-600 mt-2">See the README.md file for more information on setting up environment variables.</p>
          </div>
        )}
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