import { NextResponse } from 'next/server';
import { YouTubeVideo } from '@/types';

// Get API key and channel ID from environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

// Check if environment variables are set
if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
  console.error('YouTube API key or Channel ID is missing. Please check your .env.local file.');
}

// Type definitions for YouTube API response
interface YouTubeApiResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }>;
}

export async function GET() {
  try {
    // Check if environment variables are properly set
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      return NextResponse.json(
        { error: 'YouTube API key or Channel ID is missing. Please check your .env.local file.' },
        { status: 500 }
      );
    }
    
    // Fetch videos from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data = await response.json() as YouTubeApiResponse;
    
    // Transform the response to match our YouTubeVideo interface
    const videos: YouTubeVideo[] = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}