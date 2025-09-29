import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform is the world's largest hub designed to support startups from the pre-seed stage all the way to IPO. We connect founders with talent, investors, customers, and key learning resources in one place.",
  },
  {
    question: "Who can join the platform?",
    answer:
      "Anyone involved in the startup ecosystem can join - founders, investors, mentors, employees, and service providers. Whether you're just starting out or scaling your business, there's a place for you here.",
  },
  {
    question: "How do I register?",
    answer:
      "Registration is simple and free. Click the 'Sign Up' button, fill out your profile information, and verify your email address. You'll be able to start connecting with the community immediately.",
  },
  {
    question: "What does 'Share Needs' mean?",
    answer:
      "Share Needs is our feature that allows you to post what your startup needs - whether it's funding, talent, partnerships, or resources. The community can then respond with relevant connections and opportunities.",
  },
  {
    question: "Can I explore startups in specific sectors?",
    answer:
      "Yes! Our Explore feature allows you to filter startups by industry, stage, location, and other criteria. You can discover companies that align with your interests or investment thesis.",
  },
  {
    question: "What are Online Sessions?",
    answer:
      "Online Sessions are virtual events including workshops, pitch sessions, networking events, and educational webinars. They're designed to help you learn, connect, and grow your startup.",
  },
  {
    question: "How can I host a session?",
    answer:
      "If you're an expert in your field, you can apply to host sessions through the 'Host Sessions' section. We welcome industry leaders, successful founders, and subject matter experts to share their knowledge.",
  },
  {
    question: "Do I have to pay to attend sessions?",
    answer:
      "Most sessions are free for community members. Some premium workshops or exclusive events may have a fee, but we strive to keep valuable content accessible to all entrepreneurs.",
  },
  {
    question: "How do I get funding through the platform?",
    answer:
      "You can get funding by creating a compelling startup profile, sharing your funding needs, participating in pitch events, and connecting directly with investors who match your sector and stage.",
  },
  {
    question: "Is my startup profile visible to everyone?",
    answer:
      "Your basic profile is visible to the community, but you can control what information is public. Sensitive details like financials can be shared privately with verified investors only.",
  },
  {
    question: "How do I connect with other members?",
    answer:
      "You can connect through our messaging system, join relevant groups, attend online sessions, or use our matching algorithm that suggests relevant connections based on your needs and interests.",
  },
  {
    question: "Can I customize notifications and updates?",
    answer:
      "You can customize your notification preferences in your settings to receive updates about relevant opportunities, events, and connections while avoiding information overload.",
  },
];

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq-section"
      className="relative mt-12 py-20 px-4 sm:px-6 lg:px-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 text-sm bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-in fade-in-0 slide-in-from-top-4"
          >
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-in fade-in-0 slide-in-from-top-6 duration-700 delay-100">
            Your questions answered
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-top-8 duration-700 delay-200">
            Find answers to the most common questions about our platform and services.
          </p>
        </div>

        <div className="space-y-6 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-300">
          {faqData.map((faq, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-l-4 border-l-blue-500 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600/50 hover:-translate-y-1 animate-in fade-in-0 slide-in-from-left-4"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <CardContent className="p-6">
                  <Collapsible open={openIndex === index} onOpenChange={(open) => {
                    if (open) {
                      setOpenIndex(index);
                    } else {
                      setOpenIndex(null);
                    }
                  }}>
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <span className="text-blue-400 font-semibold text-lg">Q.</span>
                        <h3 className="text-left font-semibold text-white group-hover:text-gray-100 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openIndex === index ? (
                          <Minus className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        )}
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pt-4 cursor-pointer" onClick={() => setOpenIndex(null)}>
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-500">
        </div>
      </div>
    </section>
  );
}
