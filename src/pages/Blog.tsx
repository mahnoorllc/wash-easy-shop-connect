
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
      title: "Best Laundry Service Near Me: How to Choose Professional Cleaners in 2025",
      excerpt: "Discover the key factors to consider when selecting a reliable laundry service in your area. From pricing to quality, we cover everything you need to know.",
      author: "Sarah Johnson",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "service-guide",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1000",
      slug: "best-laundry-service-near-me-2025"
    },
    {
      id: 2,
      title: "Commercial Laundry Solutions: Complete Guide for Business Owners",
      excerpt: "From hotels to restaurants, discover how professional laundry services can streamline your business operations while reducing costs and improving efficiency.",
      author: "Michael Chen",
      date: "January 12, 2025",
      readTime: "10 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000",
      slug: "commercial-laundry-solutions-business-guide"
    },
    {
      id: 3,
      title: "Eco-Friendly Laundry Tips: Sustainable Cleaning Methods That Actually Work",
      excerpt: "Learn about sustainable laundry practices that reduce environmental impact while keeping your clothes clean and fresh. Complete green washing guide.",
      author: "Emma Rodriguez",
      date: "January 10, 2025",
      readTime: "7 min read",
      category: "sustainability",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000",
      slug: "eco-friendly-laundry-tips-sustainable-cleaning"
    },
    {
      id: 4,
      title: "Stain Removal Guide: Professional Techniques for Every Type of Stain",
      excerpt: "Master the art of stain removal with these professional techniques used by laundry experts worldwide. Complete stain treatment solutions.",
      author: "Dr. James Wilson",
      date: "January 8, 2025",
      readTime: "9 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000",
      slug: "professional-stain-removal-guide-techniques"
    },
    {
      id: 5,
      title: "How to Start a Laundry Business: Complete 2025 Startup Guide",
      excerpt: "Everything you need to know about starting a successful laundry business, from market research to equipment selection and customer acquisition strategies.",
      author: "Robert Martinez",
      date: "January 6, 2025",
      readTime: "12 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
      slug: "how-to-start-laundry-business-2025-guide"
    },
    {
      id: 6,
      title: "Best Laundry Detergent for Sensitive Skin: Dermatologist Recommended",
      excerpt: "Protect your family's skin with gentle, effective detergents. Our comprehensive review of hypoallergenic and fragrance-free laundry products.",
      author: "Dr. Amanda Foster",
      date: "January 4, 2025",
      readTime: "8 min read",
      category: "health",
      image: "https://images.unsplash.com/photo-1556909114-4f5e8ac7c909?q=80&w=1000",
      slug: "best-laundry-detergent-sensitive-skin-guide"
    },
    {
      id: 7,
      title: "Laundry Pickup and Delivery Service: Ultimate Convenience Guide 2025",
      excerpt: "Discover how laundry pickup and delivery services work, pricing comparison, and tips for choosing the best service for your needs.",
      author: "Jennifer Lee",
      date: "January 2, 2025",
      readTime: "6 min read",
      category: "service-guide",
      image: "https://images.unsplash.com/photo-1540874647822-e6c5c05027e9?q=80&w=1000",
      slug: "laundry-pickup-delivery-service-guide-2025"
    },
    {
      id: 8,
      title: "Washing Machine Buying Guide 2025: Best Models for Every Budget",
      excerpt: "Make informed decisions when purchasing commercial laundry equipment. Compare features, capacity, and cost-effectiveness for different business needs.",
      author: "Thomas Anderson",
      date: "December 30, 2024",
      readTime: "11 min read",
      category: "equipment",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000",
      slug: "washing-machine-buying-guide-2025-best-models"
    },
    {
      id: 9,
      title: "Dry Cleaning vs Regular Washing: When to Use Professional Services",
      excerpt: "Not all garments are created equal. Learn when professional dry cleaning is essential and when home care is sufficient for your valuable clothing.",
      author: "David Kim",
      date: "December 28, 2024",
      readTime: "7 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
      slug: "dry-cleaning-vs-regular-washing-guide"
    },
    {
      id: 10,
      title: "Laundry App Development: Features That Drive Customer Engagement",
      excerpt: "Key features and user experience elements that make laundry service apps successful. From scheduling to real-time tracking and payments.",
      author: "Daniel Park",
      date: "December 26, 2024",
      readTime: "9 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000",
      slug: "laundry-app-development-features-guide"
    },
    {
      id: 11,
      title: "Hotel Laundry Services: Professional Operations Management Guide",
      excerpt: "Optimize hotel laundry operations with proven strategies. From linen management to guest service enhancement and cost reduction techniques.",
      author: "Michelle Torres",
      date: "December 24, 2024",
      readTime: "10 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
      slug: "hotel-laundry-services-operations-guide"
    },
    {
      id: 12,
      title: "Natural Fabric Softener Alternatives: Organic Solutions That Work",
      excerpt: "Discover natural fabric softening methods that are safe for your family and the environment. Compare effectiveness of vinegar, baking soda, and commercial organic options.",
      author: "Dr. Lisa Brown",
      date: "December 22, 2024",
      readTime: "6 min read",
      category: "sustainability",
      image: "https://images.unsplash.com/photo-1556909114-4f5e8ac7c909?q=80&w=1000",
      slug: "natural-fabric-softener-alternatives-organic"
    },
    {
      id: 13,
      title: "Small Laundry Room Design Ideas: Maximize Space and Efficiency",
      excerpt: "Transform your compact laundry area into an efficient workspace. Smart storage solutions, layout optimization, and multi-functional design ideas.",
      author: "Amanda Cooper",
      date: "December 20, 2024",
      readTime: "8 min read",
      category: "home-improvement",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1000",
      slug: "small-laundry-room-design-ideas-maximize-space"
    },
    {
      id: 14,
      title: "Commercial Laundry Equipment Maintenance: Preventive Care Guide",
      excerpt: "Essential maintenance routines that extend equipment life and prevent costly breakdowns. Professional tips for optimal performance and efficiency.",
      author: "Mark Johnson",
      date: "December 18, 2024",
      readTime: "9 min read",
      category: "equipment",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000",
      slug: "commercial-laundry-equipment-maintenance-guide"
    },
    {
      id: 15,
      title: "Baby Clothes Washing: Safe Detergents and Gentle Care Methods",
      excerpt: "Protect your baby's delicate skin with proper clothing care. Learn about safe detergents, temperature settings, and special handling for infant garments.",
      author: "Dr. Sarah Kim",
      date: "December 16, 2024",
      readTime: "7 min read",
      category: "health",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce2d2?q=80&w=1000",
      slug: "baby-clothes-washing-safe-detergents-guide"
    },
    {
      id: 16,
      title: "Laundry Business Profitability: Revenue Optimization Strategies 2025",
      excerpt: "Maximize profits in the competitive laundry delivery market. Pricing strategies, operational efficiency, and customer retention techniques that work.",
      author: "Brian Martinez",
      date: "December 14, 2024",
      readTime: "11 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
      slug: "laundry-business-profitability-optimization-2025"
    },
    {
      id: 17,
      title: "Athletic Wear Care: Maintain Performance Fabrics and Moisture-Wicking",
      excerpt: "Keep your athletic wear performing at its best. Special care techniques for technical fabrics, odor prevention, and maintaining moisture-wicking properties.",
      author: "Coach Williams",
      date: "December 12, 2024",
      readTime: "6 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000",
      slug: "athletic-wear-care-performance-fabrics-guide"
    },
    {
      id: 18,
      title: "Hard Water Laundry Problems: Solutions for Better Wash Results",
      excerpt: "Understand how water quality affects your laundry results. Solutions for hard water problems and optimization techniques for different water types.",
      author: "Dr. Robert Chen",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "troubleshooting",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?q=80&w=1000",
      slug: "hard-water-laundry-problems-solutions-guide"
    },
    {
      id: 19,
      title: "Luxury Garment Care: Preserve Designer Clothing Investments",
      excerpt: "Protect your designer clothing investments with professional-grade care techniques. From Hermès scarves to Armani suits, learn proper handling methods.",
      author: "Victoria Blanc",
      date: "December 8, 2024",
      readTime: "9 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
      slug: "luxury-garment-care-designer-clothing-guide"
    },
    {
      id: 20,
      title: "Laundry Service Marketing: Digital Strategies That Convert 2025",
      excerpt: "Effective marketing strategies for laundry services in the digital age. Social media tactics, local SEO, and customer acquisition campaigns that work.",
      author: "Jessica Wong",
      date: "December 6, 2024",
      readTime: "10 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
      slug: "laundry-service-marketing-digital-strategies-2025"
    },
    {
      id: 21,
      title: "Allergen Removal from Clothes: Professional Techniques for Sensitive Homes",
      excerpt: "Eliminate dust mites, pet dander, and pollen from clothing and linens. Professional allergen removal techniques for healthier living environments.",
      author: "Dr. Jennifer Adams",
      date: "December 4, 2024",
      readTime: "7 min read",
      category: "health",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1000",
      slug: "allergen-removal-clothes-techniques-guide"
    },
    {
      id: 22,
      title: "Green Laundry Certification: Environmental Standards for Business",
      excerpt: "Navigate environmental certifications for commercial laundry operations. Benefits, requirements, and implementation strategies for sustainable business practices.",
      author: "Dr. Michael Green",
      date: "December 2, 2024",
      readTime: "8 min read",
      category: "sustainability",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
      slug: "green-laundry-certification-environmental-standards"
    },
    {
      id: 23,
      title: "Fabric Restoration: Bringing Damaged Clothing Back to Life",
      excerpt: "Professional restoration techniques for damaged fabrics. From burn marks to color bleeding, learn when restoration is possible and cost-effective.",
      author: "Master Cleaner Rodriguez",
      date: "November 30, 2024",
      readTime: "9 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000",
      slug: "fabric-restoration-damaged-clothing-repair"
    },
    {
      id: 24,
      title: "Laundry Business Insurance: Protect Your Investment and Customers",
      excerpt: "Essential insurance coverage for laundry businesses. Understanding liability, property damage, and professional indemnity insurance requirements.",
      author: "Insurance Expert Thompson",
      date: "November 28, 2024",
      readTime: "8 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000",
      slug: "laundry-business-insurance-protection-guide"
    },
    {
      id: 25,
      title: "Smart Laundry Technology: IoT Integration in Modern Facilities",
      excerpt: "Implement IoT technology in laundry operations. Smart monitoring systems, predictive maintenance, and automated inventory management solutions.",
      author: "Tech Innovator Liu",
      date: "November 26, 2024",
      readTime: "10 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
      slug: "smart-laundry-technology-iot-integration"
    },
    {
      id: 26,
      title: "Textile Chemistry: Understanding Fabric Composition for Better Care",
      excerpt: "Deep dive into textile chemistry and how different fiber compositions affect washing, drying, and care requirements. Essential knowledge for professionals.",
      author: "Dr. Chemistry Anderson",
      date: "November 24, 2024",
      readTime: "11 min read",
      category: "education",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000",
      slug: "textile-chemistry-fabric-composition-care"
    },
    {
      id: 27,
      title: "Vintage Clothing Care: Museum-Quality Preservation at Home",
      excerpt: "Preserve vintage and antique clothing with museum-quality techniques. Storage methods, cleaning approaches, and damage prevention for collectible garments.",
      author: "Curator Helena Smith",
      date: "November 22, 2024",
      readTime: "9 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
      slug: "vintage-clothing-care-preservation-guide"
    },
    {
      id: 28,
      title: "Laundry Route Optimization: Delivery Efficiency for Growing Businesses",
      excerpt: "Optimize delivery routes for maximum efficiency and customer satisfaction. Technology solutions and logistics strategies for laundry pickup and delivery services.",
      author: "Logistics Manager Davis",
      date: "November 20, 2024",
      readTime: "8 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000",
      slug: "laundry-route-optimization-delivery-efficiency"
    },
    {
      id: 29,
      title: "Color Protection in Laundry: Prevent Fading and Color Transfer",
      excerpt: "Scientific approach to color preservation in laundry. Understanding dye chemistry, temperature effects, and proven methods to maintain vibrancy.",
      author: "Color Expert Wilson",
      date: "November 18, 2024",
      readTime: "7 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1556909114-4f5e8ac7c909?q=80&w=1000",
      slug: "color-protection-laundry-prevent-fading"
    },
    {
      id: 30,
      title: "Laundry Franchise Success: Lessons from Top Performing Owners",
      excerpt: "Learn from successful laundry franchise owners. Growth strategies, operational excellence, and customer service insights from industry leaders.",
      author: "Business Analyst Parker",
      date: "November 16, 2024",
      readTime: "10 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
      slug: "laundry-franchise-success-lessons-guide"
    },
    {
      id: 31,
      title: "Hospital Linen Management: Infection Control Standards",
      excerpt: "Best practices for hospital laundry operations. Infection control protocols, regulatory compliance, and efficiency optimization in healthcare facilities.",
      author: "Healthcare Administrator Jones",
      date: "November 14, 2024",
      readTime: "9 min read",
      category: "healthcare",
      image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=1000",
      slug: "hospital-linen-management-infection-control"
    },
    {
      id: 32,
      title: "Dry Cleaning Chemical Safety: Environmental Health Considerations",
      excerpt: "Understanding dry cleaning solvents and their safety implications. Environmental impact, health considerations, and safer alternatives in professional cleaning.",
      author: "Environmental Scientist Lee",
      date: "November 12, 2024",
      readTime: "8 min read",
      category: "health",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
      slug: "dry-cleaning-chemical-safety-environmental"
    },
    {
      id: 33,
      title: "Solar Powered Laundry: Energy Efficiency and Alternative Power",
      excerpt: "Implement renewable energy solutions in commercial laundry operations. Solar panels, heat recovery systems, and alternative power sources for sustainability.",
      author: "Renewable Energy Expert Taylor",
      date: "November 10, 2024",
      readTime: "10 min read",
      category: "sustainability",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000",
      slug: "solar-powered-laundry-energy-efficiency"
    },
    {
      id: 34,
      title: "Professional Uniform Care: Industry-Specific Cleaning Standards",
      excerpt: "Specialized care for professional uniforms across industries. From medical scrubs to chef whites, understand specific cleaning requirements and standards.",
      author: "Uniform Specialist Brown",
      date: "November 8, 2024",
      readTime: "7 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=1000",
      slug: "professional-uniform-care-industry-standards"
    },
    {
      id: 35,
      title: "Customer Retention for Laundry Services: Build Long-Term Relationships",
      excerpt: "Proven strategies for improving customer retention in laundry services. Loyalty programs, service quality improvements, and communication best practices.",
      author: "Customer Success Manager White",
      date: "November 6, 2024",
      readTime: "8 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000",
      slug: "customer-retention-laundry-services-guide"
    },
    {
      id: 36,
      title: "Antimicrobial Fabric Treatment: Health Benefits and Applications",
      excerpt: "Explore antimicrobial fabric treatments and their benefits. Applications in healthcare, hospitality, and everyday clothing for improved hygiene and health.",
      author: "Microbiologist Dr. Garcia",
      date: "November 4, 2024",
      readTime: "9 min read",
      category: "health",
      image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=1000",
      slug: "antimicrobial-fabric-treatment-health-benefits"
    },
    {
      id: 37,
      title: "Laundry Waste Reduction: Environmental Impact Management",
      excerpt: "Comprehensive waste reduction strategies for laundry operations. Water recycling, chemical disposal, and circular economy principles in practice.",
      author: "Sustainability Director Miller",
      date: "November 2, 2024",
      readTime: "8 min read",
      category: "sustainability",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
      slug: "laundry-waste-reduction-environmental-impact"
    },
    {
      id: 38,
      title: "Technical Sportswear Maintenance: High-Performance Fabric Care",
      excerpt: "Specialized care for high-performance technical fabrics. Maintaining breathability, water resistance, and performance characteristics in sports apparel.",
      author: "Sports Technology Expert Clark",
      date: "October 31, 2024",
      readTime: "7 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000",
      slug: "technical-sportswear-maintenance-performance"
    },
    {
      id: 39,
      title: "Laundry Automation Technology: Integration Strategies for Business",
      excerpt: "Automate your laundry business operations for maximum efficiency. From sorting systems to automated folding and customer management technology.",
      author: "Automation Specialist Moore",
      date: "October 29, 2024",
      readTime: "10 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
      slug: "laundry-automation-technology-integration"
    },
    {
      id: 40,
      title: "Emergency Stain Treatment: Quick Response for Common Spills",
      excerpt: "Master emergency stain treatment techniques for quick response to spills and accidents. Professional tips for immediate action and damage prevention.",
      author: "Emergency Care Specialist Turner",
      date: "October 27, 2024",
      readTime: "6 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000",
      slug: "emergency-stain-treatment-quick-response"
    },
    {
      id: 41,
      title: "Laundry Quality Control: Consistent Standards and Satisfaction",
      excerpt: "Implement quality control systems that ensure consistent results and customer satisfaction. Monitoring systems, staff training, and continuous improvement.",
      author: "Quality Manager Phillips",
      date: "October 25, 2024",
      readTime: "9 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000",
      slug: "laundry-quality-control-standards-guide"
    },
    {
      id: 42,
      title: "Organic Cotton Care: Maintain Natural Fiber Quality",
      excerpt: "Specialized care techniques for organic cotton garments. Preserving natural properties while ensuring thorough cleaning and longevity.",
      author: "Natural Fiber Expert Evans",
      date: "October 23, 2024",
      readTime: "7 min read",
      category: "sustainability",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000",
      slug: "organic-cotton-care-natural-fiber-guide"
    },
    {
      id: 43,
      title: "Laundry Equipment Financing: Smart Investment Strategies 2025",
      excerpt: "Navigate equipment financing options for laundry businesses. Lease vs buy decisions, loan programs, and cash flow optimization strategies.",
      author: "Financial Advisor Roberts",
      date: "October 21, 2024",
      readTime: "8 min read",
      category: "business",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000",
      slug: "laundry-equipment-financing-investment-2025"
    },
    {
      id: 44,
      title: "Washing Machine Energy Efficiency: Save Money and Environment",
      excerpt: "Optimize your home laundry setup for maximum efficiency. Learn about load sizes, temperature settings, and maintenance tips that save money and energy.",
      author: "Energy Efficiency Expert Collins",
      date: "October 19, 2024",
      readTime: "8 min read",
      category: "efficiency",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1000",
      slug: "washing-machine-energy-efficiency-save-money"
    },
    {
      id: 45,
      title: "Laundry Delivery App Features: Essential Functions for Success",
      excerpt: "Key features and user experience elements that make laundry service apps successful. From scheduling to real-time tracking and secure payments.",
      author: "App Development Expert Martinez",
      date: "October 17, 2024",
      readTime: "9 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000",
      slug: "laundry-delivery-app-features-success"
    },
    {
      id: 46,
      title: "Winter Clothing Storage: Seasonal Care and Preservation",
      excerpt: "Proper storage and care techniques for winter coats, sweaters, and boots. Prevent moth damage and maintain quality during off-season storage.",
      author: "Seasonal Care Expert Kim",
      date: "October 15, 2024",
      readTime: "7 min read",
      category: "care-tips",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000",
      slug: "winter-clothing-storage-seasonal-care"
    },
    {
      id: 47,
      title: "Laundromat vs Home Washing: Cost Analysis and Convenience",
      excerpt: "Comprehensive comparison of laundromat vs home washing costs, time investment, and convenience factors. Make informed decisions for your lifestyle.",
      author: "Cost Analysis Expert Thompson",
      date: "October 13, 2024",
      readTime: "8 min read",
      category: "cost-comparison",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1000",
      slug: "laundromat-vs-home-washing-cost-analysis"
    },
    {
      id: 48,
      title: "Professional Laundry Training: Skills for Industry Success",
      excerpt: "Essential training programs and certifications for laundry professionals. Skill development, safety protocols, and career advancement opportunities.",
      author: "Training Director Wilson",
      date: "October 11, 2024",
      readTime: "10 min read",
      category: "education",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000",
      slug: "professional-laundry-training-industry-success"
    },
    {
      id: 49,
      title: "Laundry Chemical Safety: Handling and Storage Best Practices",
      excerpt: "Comprehensive safety guidelines for handling laundry chemicals. Storage requirements, personal protective equipment, and emergency procedures.",
      author: "Safety Specialist Davis",
      date: "October 9, 2024",
      readTime: "9 min read",
      category: "safety",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1000",
      slug: "laundry-chemical-safety-handling-storage"
    },
    {
      id: 50,
      title: "Future of Laundry Industry: Trends and Innovations Shaping 2025",
      excerpt: "Stay ahead of industry trends and prepare your laundry business for the future. Emerging technologies, consumer preferences, and market opportunities for 2025.",
      author: "Industry Futurist Parker",
      date: "October 7, 2024",
      readTime: "12 min read",
      category: "industry-trends",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000",
      slug: "future-laundry-industry-trends-innovations-2025"
    }
  ];

  const categories = ["All", "Business", "Care Tips", "Health", "Sustainability", "Technology", "Service Guide", "Equipment", "Education", "Safety"];

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
