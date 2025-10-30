import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Anyone between 18-65 years, weighing at least 50kg, and in good health can donate blood. You should not have donated blood in the last 3 months."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 3 months (90 days). This allows your body enough time to replenish the donated blood cells."
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, blood donation is completely safe. Sterile, single-use equipment is used for each donor, making it impossible to contract any infection."
    },
    {
      question: "How long does the donation process take?",
      answer: "The actual blood donation takes about 10-15 minutes. However, the entire process including registration, health check, and refreshments takes about 45-60 minutes."
    },
    {
      question: "What should I do before donating blood?",
      answer: "Eat a healthy meal, drink plenty of water, avoid fatty foods, and get adequate sleep the night before donation."
    },
    {
      question: "How do I know my blood type?",
      answer: "Your blood type will be determined during your first donation. You can also get it tested at any diagnostic center."
    },
    {
      question: "Can I donate if I have a medical condition?",
      answer: "It depends on the condition. Consult with our medical experts or use the chatbot for specific queries about your health status."
    },
    {
      question: "How do I request emergency blood?",
      answer: "Hospitals can create emergency requests through the Emergency page. The system will automatically notify matching donors in the area."
    }
  ];

  const contactMethods = [
    { icon: Phone, title: "Call Us", content: "+91-9362241098", action: "Call Now" },
    { icon: Mail, title: "Email Us", content: "support@redline.com", action: "Send Email" },
    { icon: MessageCircle, title: "Live Chat", content: "Chat with our AI assistant", action: "Start Chat" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <BookOpen className="h-12 w-12 text-primary mx-auto" />
            <h1 className="text-4xl font-bold">How Can We Help?</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions or reach out to our support team
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contactMethods.map((method, idx) => (
              <Card key={idx} className="text-center">
                <CardHeader>
                  <method.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription>{method.content}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{method.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions about blood donation</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">For Donors</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Create an account and select "Donor" role</li>
                  <li>Complete your profile with blood type and location</li>
                  <li>Set your availability status</li>
                  <li>Respond to emergency requests</li>
                  <li>Track your donation history and earn rewards</li>
                </ol>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">For Hospitals</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Register with hospital credentials</li>
                  <li>Complete verification process</li>
                  <li>Create emergency blood requests</li>
                  <li>Manage inventory</li>
                  <li>Connect with blood banks and donors</li>
                </ol>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">For Blood Banks</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Register your blood bank facility</li>
                  <li>Update blood inventory regularly</li>
                  <li>Fulfill hospital requests</li>
                  <li>Track dispatch and deliveries</li>
                  <li>Generate reports and analytics</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Chatbot />
    </div>
  );
};

export default Help;
