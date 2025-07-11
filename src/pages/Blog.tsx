
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Care for Your Clothes: A Complete Guide",
      excerpt: "Learn the essential tips and tricks to keep your clothes looking fresh and lasting longer. From fabric care to proper storage techniques.",
      author: "Sarah Johnson",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Care Tips",
      image: "/placeholder.svg",
      slug: "care-for-your-clothes-guide"
    },
    {
      id: 2,
      title: "Protect Your Hands During Laundry: Safety First",
      excerpt: "Discover how to keep your hands safe and healthy while doing laundry. Essential tips for choosing the right products and protective measures.",
      author: "Dr. Michael Chen",
      date: "January 12, 2025",
      readTime: "4 min read",
      category: "Health & Safety",
      image: "/placeholder.svg",
      slug: "protect-hands-during-laundry"
    },
    {
      id: 3,
      title: "Eco-Friendly Laundry: Better for You and the Planet",
      excerpt: "Learn about sustainable laundry practices that reduce environmental impact while keeping your clothes clean and fresh.",
      author: "Emma Green",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Sustainability",
      image: "/placeholder.svg",
      slug: "eco-friendly-laundry-tips"
    },
    {
      id: 4,
      title: "Stain Removal Secrets: Professional Techniques",
      excerpt: "Master the art of stain removal with these professional techniques used by laundry experts worldwide.",
      author: "James Wilson",
      date: "January 8, 2025",
      readTime: "7 min read",
      category: "Care Tips",
      image: "/placeholder.svg",
      slug: "stain-removal-secrets"
    },
    {
      id: 5,
      title: "Winter Laundry Tips: Dealing with Cold Weather",
      excerpt: "Special techniques for washing winter clothes, dealing with static, and keeping your laundry fresh during cold months.",
      author: "Lisa Martinez",
      date: "January 6, 2025",
      readTime: "5 min read",
      category: "Seasonal Tips",
      image: "/placeholder.svg",
      slug: "winter-laundry-tips"
    },
    {
      id: 6,
      title: "Commercial Laundry Best Practices",
      excerpt: "Learn how businesses can optimize their laundry operations for efficiency, cost savings, and quality results.",
      author: "Robert Anderson",
      date: "January 4, 2025",
      readTime: "8 min read",
      category: "Commercial",
      image: "/placeholder.svg",
      slug: "commercial-laundry-best-practices"
    },
    {
      id: 7,
      title: "Fabric-Specific Care: Silk, Wool, and Delicates",
      excerpt: "Master the art of caring for delicate fabrics with expert tips on washing silk, wool, and other special materials.",
      author: "Maria Rodriguez",
      date: "January 2, 2025",
      readTime: "6 min read",
      category: "Care Tips",
      image: "/placeholder.svg",
      slug: "fabric-specific-care-guide"
    },
    {
      id: 8,
      title: "Laundry Equipment Maintenance: Keep It Running",
      excerpt: "Essential maintenance tips to keep your washing machines and dryers running efficiently and lasting longer.",
      author: "Tom Mitchell",
      date: "December 30, 2024",
      readTime: "5 min read",
      category: "Maintenance",
      image: "/placeholder.svg",
      slug: "laundry-equipment-maintenance"
    },
    {
      id: 9,
      title: "Cost-Saving Laundry Hacks for Families",
      excerpt: "Smart strategies to reduce your laundry costs while maintaining cleanliness and quality for large families.",
      author: "Jennifer Lee",
      date: "December 28, 2024",
      readTime: "4 min read",
      category: "Budget Tips",
      image: "/placeholder.svg",
      slug: "cost-saving-laundry-hacks"
    },
    {
      id: 10,
      title: "Quick Laundry Fixes: 15-Minute Solutions",
      excerpt: "Emergency laundry tips and quick fixes for when you need clean clothes fast without compromising quality.",
      author: "Alex Thompson",
      date: "December 26, 2024",
      readTime: "3 min read",
      category: "Quick Tips",
      image: "/placeholder.svg",
      slug: "quick-laundry-fixes"
    }
  ];

  const categories = ["All", "Care Tips", "Health & Safety", "Sustainability", "Seasonal Tips", "Commercial", "Maintenance", "Budget Tips", "Quick Tips"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            WashEasy Blog
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Expert tips, guides, and insights to help you care for your clothes and make the most of your laundry experience.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg md:text-xl line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700" asChild>
                      <Link to={`/blog/${post.slug}`} className="flex items-center gap-1">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest laundry tips, care guides, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
