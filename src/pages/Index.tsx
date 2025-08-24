import { useEffect } from 'react';
import { Chatbox } from '@/components/Chatbox';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = '24DESIGN - AI Chat Assistant for Tour Guides';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional AI chatbox for 24DESIGN\'s AI Skills for Tour Guides course. Learn digital marketing, photography, AI tools, and more for tourism professionals.');
    }
  }, []);

  return <Chatbox />;
};

export default Index;
