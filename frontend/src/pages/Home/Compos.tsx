import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
interface FeatureProps {
  title: string;
  description: string;
  route: string;
}

const features: FeatureProps[] = [
    {
        title: "Weather Prediction",
        description:
          "Weather prediction data on a farming web page provides real-time forecasts.",
        route: "weather.report",
      },
      {
        title: "Crop Adviser AI",
        description:
          "Crop prediction based on NPK values of soil provides insights into potential yields.",
        route: "crop.adviser.ai",
      },
      {
        title: "Crop Diseases AI",
        description:
          "Crop disease prediction based on uploaded photos utilizes AI to provide early detection.",
        route: "crop.disease.ai",
      },
      {
        title: "Crop Yield AI",
        description:
        "AI-powered crop yield prediction enhancing farming website efficiency and harvest planning.",
        route: "crop.cropYield.ai"
      }
];

const Features = () => {
    return (
      <section id="howItWorks" className="container text-center py-24 sm:py-32">
        <h2 className="text-3xl md:text-4xl font-bold ">
          Empowering Farmers{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            With{" "}
          </span>
          Smart Solutions!
        </h2>
        <div style={{ marginTop: '20px' }}></div>
        <div style={{ marginTop: '20px' }}></div>
        <div style={{ marginTop: '20px' }}></div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, route }: FeatureProps) => (
            <Card key={title} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
              <Link to={route}>
                <button
                  className="bg-primary text-white px-4 py-2 mt-4 rounded-md hover:bg-primary-dark transition duration-300"
                >
                  Explore
                </button>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    );
  };
  
  export default Features;