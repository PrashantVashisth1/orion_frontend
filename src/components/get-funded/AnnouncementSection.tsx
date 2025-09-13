import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Announcement = {
  id: string;
  type: "general" | "investor";
  title: string;
  date: string;
  content: string;
  investor?: {
    name: string;
    profileUrl: string;
  };
};

const sampleAnnouncements: Announcement[] = [
  {
    id: "1",
    type: "investor",
    title: "Welcoming our top Investor",
    date: "2025-09-10",
    content:
      "We are excited to welcome one of the top venture capital firms to our platform.",
    investor: {
      name: "Volt VC",
      profileUrl: "/investor/volt-vc",
    },
  },
  {
    id: "2",
    type: "general",
    title: "Upcoming Pitch Day",
    date: "2025-09-08",
    content:
      "Join us for our monthly virtual pitch day. Selected startups will get a chance to present to our investor panel.",
  },
];

export function AnnouncementSection() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20">
        <CardContent className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Latest Announcements
            </h2>
            <p className="text-gray-400">
              Stay updated with the latest funding opportunities and investor
              news
            </p>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {sampleAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className="bg-gray-800/50 border-gray-700 transition-all duration-300 hover:bg-gray-800/70"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {new Date(announcement.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">
                          {announcement.type === "investor"
                            ? "New Investor"
                            : "Update"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-400">{announcement.content}</p>
                    </div>

                    {announcement.investor && (
                      <Button
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
                        onClick={() =>
                          (window.location.href =
                            announcement.investor!.profileUrl)
                        }
                      >
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Notice */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            New announcements are published regularly. Check back often for
            updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
