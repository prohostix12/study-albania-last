import './globals.css';
import ClientShell from '../components/ClientShell';

export const metadata = {
  title: 'Study in Albania | Affordable European Education | Apply Now',
  description: 'Study in Albania — Affordable English-taught programs, European ECTS credits, top universities like Canadian Institute of Technology & Epoka University. Apply for free counselling today!',
  keywords: 'study in Albania, Albanian universities, study abroad, affordable education Europe, ECTS, bachelor master Albania',
  openGraph: {
    title: 'Study in Albania | Your Gateway to European Education',
    description: 'Join thousands of international students studying in Albania. Affordable fees, English programs, EU pathways.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
