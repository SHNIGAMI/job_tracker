import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { Job } from "../schemas/jobSchema";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
}

const JobCard = ({ job, onEdit, onDelete }: JobCardProps) => {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this job application?")) {
      onDelete(job.id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-200",
        };
      case "interview":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          border: "border-yellow-200",
        };
      case "offer":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
        };
      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          border: "border-red-200",
        };
      case "saved":
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <WorkIcon fontSize="small" />;
      case "interview":
        return <ScheduleIcon fontSize="small" />;
      case "offer":
        return <CheckCircleIcon fontSize="small" />;
      case "rejected":
        return <CancelIcon fontSize="small" />;
      case "saved":
        return <BookmarkIcon fontSize="small" />;
      default:
        return <WorkIcon fontSize="small" />;
    }
  };

  const statusStyle = getStatusColor(job.status);

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${statusStyle.border} bg-white`}
    >
      <CardContent className="p-6">
        {/* Header with Company Avatar and Status */}
        <Box className="flex items-start justify-between mb-4">
          <Box className="flex items-center space-x-3">
            <Avatar className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {job.company.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                className="font-semibold text-gray-900 line-clamp-1"
              >
                {job.title}
              </Typography>
              <Box className="flex items-center text-gray-600">
                <BusinessIcon fontSize="small" className="mr-1" />
                <Typography variant="body2">{job.company}</Typography>
              </Box>
            </Box>
          </Box>
          <Chip
            icon={getStatusIcon(job.status)}
            label={job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            className={`${statusStyle.bg} ${statusStyle.text} font-medium border-0`}
            size="small"
          />
        </Box>

        {/* Job Details */}
        <Box className="space-y-3 mb-4">
          <Box className="flex items-center text-gray-600">
            <LocationIcon fontSize="small" className="mr-2 text-gray-400" />
            <Typography variant="body2">{job.location}</Typography>
          </Box>
          <Box className="flex items-center text-gray-600">
            <MoneyIcon fontSize="small" className="mr-2 text-gray-400" />
            <Typography variant="body2" className="font-medium">
              ${job.salary.toLocaleString()}
            </Typography>
          </Box>
          {job.notes && (
            <Box className="mt-3">
              <Typography
                variant="body2"
                className="text-gray-600 line-clamp-2"
              >
                {job.notes}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Applied Date */}
        <Box className="mb-4">
          <Typography variant="caption" className="text-gray-500">
            Applied: {new Date(job.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Box className="flex space-x-2">
            <Tooltip title="Edit Application">
              <IconButton
                size="small"
                onClick={() => onEdit(job)}
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Application">
              <IconButton
                size="small"
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEdit(job)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
