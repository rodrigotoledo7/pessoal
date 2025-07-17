This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Variables

Before running the application, you need to set up environment variables for the contact form email functionality and YouTube integration:

1. Copy the `.env.local.example` file to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit the `.env.local` file and fill in your configuration:

   **Email Configuration:**
   - `RECIPIENT_EMAIL`: The email address that will receive contact form submissions
   - `EMAIL_SERVER`: Your SMTP server (e.g., smtp.gmail.com)
   - `EMAIL_PORT`: SMTP port (typically 587 for TLS)
   - `EMAIL_SECURE`: Set to 'true' for SSL (port 465), 'false' for TLS (port 587)
   - `EMAIL_USER`: Your email username/address
   - `EMAIL_PASSWORD`: Your email password or app-specific password
   - `EMAIL_FROM`: The sender name and email that appears in the "From" field

   **YouTube API Configuration:**
   - `YOUTUBE_API_KEY`: Your YouTube Data API v3 key
   - `YOUTUBE_CHANNEL_ID`: The ID of the YouTube channel to display videos from

> **Note for Gmail users**: You may need to use an "App Password" instead of your regular password. See [Google Account Help](https://support.google.com/accounts/answer/185833) for more information.

> **Note for YouTube API**: You need to create a project in the [Google Cloud Console](https://console.cloud.google.com/), enable the YouTube Data API v3, and create an API key. See [YouTube Data API Overview](https://developers.google.com/youtube/v3/getting-started) for more information.

### Running the Development Server

After setting up the environment variables, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

### YouTube Videos Integration

The site includes a YouTube videos section that displays videos from a specified YouTube channel:

- Features the latest video prominently at the top
- Displays a grid of other videos below
- Shows video thumbnails, titles, and publication dates
- Links directly to the videos on YouTube
- Automatically updates when new videos are published to the channel

The YouTube integration is implemented using:
- YouTube Data API v3 for fetching video data
- Next.js API routes for backend processing
- React hooks for state management and data fetching
- Environment variables for API key and channel ID configuration

### Contact Form

The site includes a contact form that allows visitors to send messages directly to your email address. The form:

- Collects the visitor's name, email, subject, and message
- Validates all required fields
- Sends the message to the email address specified in the `RECIPIENT_EMAIL` environment variable
- Provides feedback to the user about the status of their submission
- Sets the reply-to address to the visitor's email for easy responses

The contact form is implemented using:
- React state for form handling on the frontend
- Next.js API routes for backend processing
- Nodemailer for sending emails

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
