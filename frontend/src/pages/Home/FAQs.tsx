import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FAQProps {
    question: string;
    answer: string;
    value: string;
  }
  
  const FAQList: FAQProps[] = [
    {
      question: "How often should I water my crops?",
      answer: "The frequency of watering depends on factors like crop type, soil type, and weather conditions. Generally, crops require consistent moisture, but it's crucial to avoid waterlogging.",
      value: "item-1",
    },
    {
      question: "What should I do if I suspect my crops are affected by a disease?",
      answer:
        "If you notice signs of crop disease such as leaf spots or wilting, promptly identify the disease using resources or consult with agricultural experts for accurate diagnosis and appropriate management strategies.",
      value: "item-2",
    },
    {
      question:
        "How do I identify common pests and diseases affecting crops?",
      answer:"You can identify pests and diseases by observing plant symptoms, such as leaf discoloration or spots, and using guides or apps that provide visual recognition and management tips.",
      value: "item-3",
    },
    {
      question: "How do I subscribe or unsubscribe from your newsletter?",
      answer: "To subscribe or unsubscribe from our newsletter, go to your account settings or the newsletter subscription page on our website. You can manage your subscription preferences there.",
      value: "item-4",
    },
    {
      question:
        "How do I create an account on your farming website?",
      answer:
        "To create an account, click on the Sign up or Register button on the homepage, fill out the required information such as name, email, and password, and follow the prompts to complete the registration process.",
      value: "item-5",
    },
  ];
  
const FAQ = () => {
    return (
      <section
        id="faq"
        className="container py-24 sm:py-32"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Questions
          </span>
        </h2>
  
        <Accordion
          type="single"
          collapsible
          className="w-full AccordionRoot"
        >
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem
              key={value}
              value={value}
            >
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>
  
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    );
  };

  export default FAQ;