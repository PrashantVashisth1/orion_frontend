import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StartupCardProps {
  name: string;
  description: string;
  funding?: string;
  team?: string;
  growth?: string;
  category: string;
  isWeekly?: boolean;
}

function StartupCard({
  name,
  description,
  funding,
  team,
  growth,
  category,
  isWeekly = false,
}: StartupCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        isWeekly
          ? "bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/20"
          : "bg-gray-800/50 hover:bg-gray-800/70 border-gray-700"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
            <Badge
              variant="secondary"
              className={cn(
                "bg-opacity-20",
                isWeekly
                  ? "bg-purple-500 text-purple-200"
                  : "bg-blue-500 text-blue-200"
              )}
            >
              {category}
            </Badge>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-6">{description}</p>

        {(funding || team || growth) && (
          <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-700">
            {funding && (
              <div>
                <p className="text-purple-400 font-semibold">{funding}</p>
                <p className="text-xs text-gray-400">Funding</p>
              </div>
            )}
            {team && (
              <div>
                <p className="text-blue-400 font-semibold">{team}</p>
                <p className="text-xs text-gray-400">Team</p>
              </div>
            )}
            {growth && (
              <div>
                <p className="text-cyan-400 font-semibold">{growth}</p>
                <p className="text-xs text-gray-400">Growth</p>
              </div>
            )}
          </div>
        )}

        <Button
          variant="secondary"
          className={cn(
            "w-full",
            isWeekly
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          )}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}

export function TrendingSection() {
  const startupOfTheWeek = {
    name: "TechFlow AI",
    category: "Unicorn",
    description:
      "Revolutionary AI platform transforming business operations with intelligent automation and predictive analytics.",
    funding: "$2.1B",
    team: "500+",
    growth: "300%",
  };

  const trendingStartups = [
    {
      name: "GreenTech Solutions",
      category: "CleanTech",
      description:
        "Innovative sustainable energy solutions for urban environments.",
      funding: "$50M",
      team: "100+",
      growth: "150%",
    },
    {
      name: "HealthAI Labs",
      category: "HealthTech",
      description:
        "AI-powered diagnostics and personalized healthcare solutions.",
      funding: "$75M",
      team: "200+",
      growth: "200%",
    },
    {
      name: "CyberShield",
      category: "Cybersecurity",
      description:
        "Next-generation cybersecurity platform using quantum computing.",
      funding: "$40M",
      team: "80+",
      growth: "180%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Startup of the Week */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-800">
          <span className="text-orange-400">Startup of the Week</span>
        </h2>
        <StartupCard {...startupOfTheWeek} isWeekly={true} />
      </section>

      {/* Trending Startups */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-gray-800">
          Trending Startups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingStartups.map((startup, index) => (
            <StartupCard key={index} {...startup} />
          ))}
        </div>
      </section>
    </div>
  );
}
