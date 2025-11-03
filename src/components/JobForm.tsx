import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Notes as NotesIcon,
} from "@mui/icons-material";
import { createJobSchema, CreateJob, Job } from "../schemas/jobSchema";

interface JobFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateJob) => void;
  initialData?: Job;
}

const JobForm = ({ open, onClose, onSubmit, initialData }: JobFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateJob>({
    resolver: zodResolver(createJobSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          company: initialData.company,
          status: initialData.status,
          location: initialData.location,
          salary: initialData.salary,
          notes: initialData.notes,
        }
      : {},
  });

  // Reset form when initialData changes (for editing existing jobs)
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        company: initialData.company,
        status: initialData.status,
        location: initialData.location,
        salary: initialData.salary,
        notes: initialData.notes,
      });
    } else {
      reset({});
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: CreateJob) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const statusOptions = [
    { value: "applied", label: "Applied", color: "bg-blue-100 text-blue-800" },
    {
      value: "interview",
      label: "Interview",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "offer", label: "Offer", color: "bg-green-100 text-green-800" },
    { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
    { value: "saved", label: "Saved", color: "bg-gray-100 text-gray-800" },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "rounded-2xl shadow-2xl",
      }}
    >
      <DialogTitle className="pb-2">
        <Box className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
            <WorkIcon className="text-white" />
          </div>
          <Typography variant="h5" className="font-semibold text-gray-900">
            {initialData ? "Edit Job Application" : "Add New Job Application"}
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent className="px-6 pb-6">
          <Box className="space-y-4">
            <TextField
              {...register("title")}
              label="Job Title"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.title}
              helperText={errors.title?.message}
              className="bg-gray-50"
            />

            <TextField
              {...register("company")}
              label="Company"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.company}
              helperText={errors.company?.message}
              className="bg-gray-50"
            />

            <Box>
              <Typography
                variant="body2"
                className="mb-2 text-gray-700 font-medium"
              >
                Application Status
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    clickable
                    className={`${
                      option.value === initialData?.status
                        ? option.color
                        : "bg-gray-100 text-gray-600"
                    } hover:opacity-80 transition-opacity`}
                    onClick={() => {
                      // This would need to be handled differently since we're using react-hook-form
                      // For now, we'll keep the select dropdown
                    }}
                  />
                ))}
              </Box>
              <TextField
                {...register("status")}
                select
                fullWidth
                margin="normal"
                error={!!errors.status}
                helperText={errors.status?.message}
                className="mt-2"
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                {...register("location")}
                label="Location"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.location}
                helperText={errors.location?.message}
                className="bg-gray-50"
              />

              <TextField
                {...register("salary", { valueAsNumber: true })}
                label="Salary"
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.salary}
                helperText={errors.salary?.message}
                className="bg-gray-50"
              />
            </Box>

            <TextField
              {...register("notes")}
              label="Notes"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="mt-2">
                    <NotesIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              className="bg-gray-50"
              placeholder="Add any additional notes about this application..."
            />
          </Box>
        </DialogContent>

        <DialogActions className="px-6 pb-6 pt-0">
          <Button
            onClick={onClose}
            variant="outlined"
            className="px-6 py-2 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            {initialData ? "Update Application" : "Add Application"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JobForm;
