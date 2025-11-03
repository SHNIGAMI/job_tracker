import { useJobs } from "../hooks/useJobs";
import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";
import {
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
  Bookmark as BookmarkIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const { data: jobs, isLoading } = useJobs();

  if (isLoading || !jobs) {
    return (
      <Box className="mb-8">
        <Typography variant="h5" className="mb-4 text-gray-700">
          Dashboard
        </Typography>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Box>
    );
  }

  const stats = {
    total: jobs.length,
    applied: jobs.filter((job) => job.status === "applied").length,
    interview: jobs.filter((job) => job.status === "interview").length,
    offer: jobs.filter((job) => job.status === "offer").length,
    rejected: jobs.filter((job) => job.status === "rejected").length,
    saved: jobs.filter((job) => job.status === "saved").length,
  };

  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: WorkIcon,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Interviews",
      value: stats.interview,
      icon: ScheduleIcon,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      title: "Offers",
      value: stats.offer,
      icon: CheckCircleIcon,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Success Rate",
      value:
        stats.total > 0 ? Math.round((stats.interview / stats.total) * 100) : 0,
      icon: TrendingUpIcon,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      suffix: "%",
    },
  ];

  return (
    <Box className="mb-8">
      <Typography variant="h5" className="mb-6 text-gray-800 font-semibold">
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} className="mb-6">
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography
                      variant="h4"
                      className={`font-bold ${stat.textColor}`}
                    >
                      {stat.value}
                      {stat.suffix || ""}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mt-1">
                      {stat.title}
                    </Typography>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full text-white`}>
                    <stat.icon />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Status Breakdown */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Typography variant="h6" className="mb-4 text-gray-800 font-medium">
            Application Status Breakdown
          </Typography>
          <div className="flex flex-wrap gap-3">
            <Chip
              icon={<WorkIcon />}
              label={`Applied: ${stats.applied}`}
              className="bg-blue-100 text-blue-800 hover:bg-blue-200"
            />
            <Chip
              icon={<ScheduleIcon />}
              label={`Interview: ${stats.interview}`}
              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            />
            <Chip
              icon={<CheckCircleIcon />}
              label={`Offers: ${stats.offer}`}
              className="bg-green-100 text-green-800 hover:bg-green-200"
            />
            <Chip
              icon={<CancelIcon />}
              label={`Rejected: ${stats.rejected}`}
              className="bg-red-100 text-red-800 hover:bg-red-200"
            />
            <Chip
              icon={<BookmarkIcon />}
              label={`Saved: ${stats.saved}`}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
