import { useState, useMemo } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useJobs, useDeleteJob, useUpdateJob } from "../hooks/useJobs";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import Dashboard from "../components/Dashboard";
import SearchAndFilter from "../components/SearchAndFilter";
import { Job, CreateJob } from "../schemas/jobSchema";

const Home = () => {
  const { data: jobs, isLoading } = useJobs();
  const deleteJobMutation = useDeleteJob();
  const updateJobMutation = useUpdateJob();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !statusFilter || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteJobMutation.mutate(id);
  };

  const handleUpdate = (data: CreateJob) => {
    if (selectedJob) {
      updateJobMutation.mutate({ id: selectedJob.id, job: data });
      setEditModalOpen(false);
      setSelectedJob(undefined);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" className="py-8">
        <Box className="mb-8">
          <Typography variant="h3" className="mb-2 text-gray-900 font-bold">
            Job Tracker
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Track and manage your job applications efficiently
          </Typography>
        </Box>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
          <div className="bg-gray-200 h-8 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="mb-8">
        <Typography variant="h3" className="mb-2 text-gray-900 font-bold">
          Job Tracker
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Track and manage your job applications efficiently
        </Typography>
      </Box>

      <Dashboard />

      <Box className="mb-6">
        <Typography variant="h5" className="mb-4 text-gray-800 font-semibold">
          Your Applications
        </Typography>

        {jobs && jobs.length > 0 && (
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalJobs={jobs.length}
            filteredCount={filteredJobs.length}
          />
        )}
      </Box>

      {jobs && jobs.length === 0 ? (
        <Box className="text-center py-12">
          <Typography variant="h6" className="text-gray-500 mb-4">
            No job applications yet
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Start by adding your first job application to get tracking!
          </Typography>
        </Box>
      ) : filteredJobs.length === 0 ? (
        <Box className="text-center py-12">
          <Typography variant="h6" className="text-gray-500 mb-4">
            No applications match your search
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Try adjusting your search terms or filters
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} lg={4} key={job.id}>
              <JobCard job={job} onEdit={handleEdit} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}

      <JobForm
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={selectedJob}
      />
    </Container>
  );
};

export default Home;
