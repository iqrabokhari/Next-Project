import { useRouter } from 'next/router';
import Link from 'next/link';

const helpContent = {
  faq: {
    title: 'Common Inquiries',
    content: 'Here are some frequently asked questions to help you get started with our service. If you have any other questions, feel free to contact us.',
  },
  contact: {
    title: 'Get in Touch with Us',
    content: 'For any inquiries or assistance, you can reach us through our email: support@example.com. We are here to help you.',
  },
  privacy: {
    title: 'Our Privacy Commitment',
    content: 'Your privacy is very important to us. We ensure that all your personal information is kept safe and only used for purposes stated in our policy.',
  },
};

export default function HelpPage() {
  const router = useRouter();
  const slug = router.query.slug || [];

  if (slug.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Help Center</h1>
        <p className="mb-4 text-lg text-gray-300">How can we assist you today?</p>
        <ul className="list-disc pl-6 space-y-1 text-lg text-gray-200">
          <li><Link href="/help/faq" className="text-blue-400 hover:underline">Common Inquiries</Link></li>
          <li><Link href="/help/contact" className="text-blue-400 hover:underline">Get in Touch</Link></li>
          <li><Link href="/help/privacy" className="text-blue-400 hover:underline">Our Privacy Commitment</Link></li>
        </ul>
      </div>
    );
  }

  const pageKey = slug[0];
  const page = helpContent[pageKey];

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2 text-white">Page Not Found</h1>
        <p className="mb-4 text-lg text-gray-300">The help topic you're looking for does not exist.</p>
        <Link href="/help" className="text-blue-400 hover:underline text-lg">← Back to Help</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-white">{page.title}</h1>
      <p className="mb-6 text-lg text-gray-300">{page.content}</p>
      <Link href="/" className="text-blue-400 hover:underline text-lg">← Back to Home</Link>
    </div>
  );
}
