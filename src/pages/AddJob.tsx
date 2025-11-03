import { useState } from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useCreateJob } from "../hooks/useJobs";
import JobForm from "../components/JobForm";
import { CreateJob } from "../schemas/jobSchema";
import {
  Add as AddIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const AddJob = () => {
  const createJobMutation = useCreateJob();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = (data: CreateJob) => {
    createJobMutation.mutate(data);
    setModalOpen(false);
  };

  const quickTips = [
    {
      icon: <WorkIcon className="text-blue-600" />,
      title: "Track Everything",
      description: "Keep detailed records of all your job applications",
    },
    {
      icon: <TrendingUpIcon className="text-green-600" />,
      title: "Monitor Progress",
      description: "See your application success rate and patterns",
    },
    {
      icon: <CheckCircleIcon className="text-purple-600" />,
      title: "Stay Organized",
      description: "Never miss follow-ups or important deadlines",
    },
  ];

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="mb-8">
        <Typography variant="h3" className="mb-2 text-gray-900 font-bold">
          Add New Application
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Start tracking a new job application to keep your search organized
        </Typography>
      </Box>

      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action Card */}
        <Box className="lg:col-span-2">
          <Paper className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <AddIcon className="text-white text-3xl" />
            </div>
            <Typography
              variant="h5"
              className="mb-4 text-gray-900 font-semibold"
            >
              Ready to Add a New Job?
            </Typography>
            <Typography
              variant="body1"
              className="mb-6 text-gray-600 max-w-md mx-auto"
            >
              Click the button below to add a new job application. Include all
              the important details to keep track of your progress.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setModalOpen(true)}
              startIcon={<AddIcon />}
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Add New Application
            </Button>
          </Paper>
        </Box>

        {/* Tips Sidebar */}
        <Box className="space-y-6">
          <Typography variant="h6" className="text-gray-900 font-semibold">
            Why Track Your Applications?
          </Typography>

          {quickTips.map((tip, index) => (
            <Paper
              key={index}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <Box className="flex items-start space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">{tip.icon}</div>
                <Box>
                  <Typography
                    variant="subtitle2"
                    className="font-medium text-gray-900 mb-1"
                  >
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {tip.description}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}

          <Paper className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
            <Typography
              variant="subtitle2"
              className="font-medium text-gray-900 mb-2"
            >
              💡 Pro Tip
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              The more detailed your application records, the better insights
              you'll get about your job search progress.
            </Typography>
          </Paper>
        </Box>
      </Box>

      <JobForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />
    </Container>
  );
};

export default AddJob;
