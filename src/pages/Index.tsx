import { useEffect } from 'react';
import { Chatbox } from '@/components/Chatbox';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'DESIGN24 - AI Chat Assistant for Tour Guides';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional AI chatbox for DESIGN24\'s AI Skills for Tour Guides course. Learn digital marketing, photography, AI tools, and more for tourism professionals.');
    }
  }, []);

  return <Chatbox />;
};

export default Index;
