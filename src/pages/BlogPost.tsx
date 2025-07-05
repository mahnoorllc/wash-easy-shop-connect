
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would be fetched based on slug
  const post = {
    title: "How to Care for Your Clothes: A Complete Guide",
    author: "Sarah Johnson",
    date: "January 15, 2025",
    readTime: "5 min read",
    category: "Care Tips",
    image: "/placeholder.svg",
    content: `
      <p>Taking proper care of your clothes is essential for maintaining their appearance, extending their lifespan, and getting the most value from your wardrobe investment. Whether you're dealing with delicate fabrics or everyday wear, following the right care practices can make all the difference.</p>

      <h2>Understanding Fabric Types</h2>
      <p>Different fabrics require different care approaches. Cotton is generally durable and can handle regular washing, while silk and wool need gentler treatment. Always check the care labels on your garments before washing.</p>

      <h3>Natural Fibers</h3>
      <ul>
        <li><strong>Cotton:</strong> Can be machine washed in warm water, but may shrink if washed in hot water</li>
        <li><strong>Wool:</strong> Should be hand washed or dry cleaned, never wrung out when wet</li>
        <li><strong>Silk:</strong> Requires gentle hand washing or professional dry cleaning</li>
        <li><strong>Linen:</strong> Can be machine washed but may wrinkle easily</li>
      </ul>

      <h3>Synthetic Fibers</h3>
      <ul>
        <li><strong>Polyester:</strong> Durable and easy to care for, can be machine washed</li>
        <li><strong>Nylon:</strong> Quick-drying and strong, but can be damaged by high heat</li>
        <li><strong>Acrylic:</strong> Machine washable but prone to pilling</li>
      </ul>

      <h2>Proper Washing Techniques</h2>
      <p>The key to effective clothes care starts with proper washing techniques. Here are some essential tips:</p>

      <h3>Sorting Your Laundry</h3>
      <p>Always sort your laundry by color, fabric type, and soil level. This prevents color bleeding and ensures that each item gets the appropriate treatment.</p>

      <h3>Water Temperature Guidelines</h3>
      <ul>
        <li><strong>Hot water (130°F+):</strong> Best for whites and heavily soiled items</li>
        <li><strong>Warm water (90-110°F):</strong> Good for moderately soiled items and permanent press fabrics</li>
        <li><strong>Cold water (80°F or below):</strong> Ideal for darks, brights, and delicate fabrics</li>
      </ul>

      <h2>Drying Best Practices</h2>
      <p>Proper drying is just as important as washing. Here's how to do it right:</p>

      <h3>Air Drying vs. Machine Drying</h3>
      <p>Air drying is gentler on fabrics and helps prevent shrinkage and fading. However, machine drying is more convenient and can help reduce wrinkles when done correctly.</p>

      <h3>Tips for Machine Drying</h3>
      <ul>
        <li>Use the appropriate heat setting for your fabrics</li>
        <li>Remove clothes promptly to prevent wrinkles</li>
        <li>Clean the lint filter regularly</li>
        <li>Don't overload the dryer</li>
      </ul>

      <h2>Storage and Maintenance</h2>
      <p>Proper storage is crucial for maintaining your clothes' quality and appearance:</p>

      <ul>
        <li>Use quality hangers for shirts, dresses, and jackets</li>
        <li>Fold heavy sweaters to prevent stretching</li>
        <li>Store seasonal items in breathable garment bags</li>
        <li>Keep your closet clean and well-ventilated</li>
        <li>Use cedar blocks or lavender sachets to deter insects</li>
      </ul>

      <h2>When to Seek Professional Help</h2>
      <p>Some items are best left to the professionals. Consider professional cleaning for:</p>

      <ul>
        <li>Structured garments like suits and blazers</li>
        <li>Delicate fabrics like silk and cashmere</li>
        <li>Items with stubborn stains</li>
        <li>Formal wear and special occasion garments</li>
      </ul>

      <p>By following these care guidelines, you'll keep your clothes looking their best for years to come. Remember, investing time in proper care today will save you money on replacements tomorrow.</p>
    `
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
