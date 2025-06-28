import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import HeroSection from "@/components/landing/HeroSection";
import FeatureCard from "@/components/landing/FeatureCard";
import TestimonialCard from "@/components/landing/TestimonialCard";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Image, Moon, Zap, Shield } from "lucide-react";



const LandingPage = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Instant messaging with lightning-fast delivery and read receipts"
    },
    {
      icon: Users,
      title: "Group Messaging",
      description: "Create groups, invite friends, and manage conversations effortlessly"
    },
    {
      icon: Image,
      title: "Media Sharing",
      description: "Share photos, videos, and files with ease in any conversation"
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Switch between light and dark themes for comfortable chatting"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with smooth animations and instant responses"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are protected with end-to-end encryption"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Design Team Lead",
      content: "YamChat has revolutionized how our team communicates. The interface is so intuitive!",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Student",
      content: "Finally, a chat app that's both fun and functional. My study groups love it!",
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      role: "Remote Worker",
      content: "The group messaging features are incredible. Staying connected has never been easier.",
      avatar: "ET"
    }
  ];

  return (
    <LandingPageLayout>
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose YamChat?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Packed with features that make communication effortless and enjoyable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                animationDelay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get Started in Seconds</h2>
            <p className="text-xl text-muted-foreground">Simple steps to join the YamChat community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Sign Up", description: "Create your free account with just your email" },
              { step: "02", title: "Add Friends", description: "Find and connect with friends or join groups" },
              { step: "03", title: "Start Chatting", description: "Enjoy seamless conversations and have fun!" }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="w-16 h-16 yamchat-gradient rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Users Worldwide</h2>
            <p className="text-xl text-muted-foreground">See what our community has to say</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
                animationDelay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Chatting?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have made YamChat their go-to messaging platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="yamchat-gradient text-white hover:opacity-90 text-lg px-8 py-3">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default LandingPage;
