import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  totalJobs: number;
  filteredCount: number;
}

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalJobs,
  filteredCount,
}: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "applied", label: "Applied" },
    { value: "interview", label: "Interview" },
    { value: "offer", label: "Offer" },
    { value: "rejected", label: "Rejected" },
    { value: "saved", label: "Saved" },
  ];

  const handleClearSearch = () => {
    onSearchChange("");
  };

  const handleClearFilters = () => {
    onStatusFilterChange("");
    setShowFilters(false);
  };

  return (
    <Box className="mb-6 space-y-4">
      {/* Search Bar */}
      <Box className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by job title, company, or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon className="text-gray-400" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="bg-white rounded-lg shadow-sm"
        />

        <Box className="flex items-center gap-2">
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            className={`${
              showFilters ? "bg-blue-100 text-blue-600" : "text-gray-600"
            } hover:bg-blue-50`}
          >
            <FilterIcon />
          </IconButton>

          {(searchTerm || statusFilter) && (
            <Chip
              label={`${filteredCount} of ${totalJobs} jobs`}
              size="small"
              className="bg-blue-100 text-blue-800"
            />
          )}
        </Box>
      </Box>

      {/* Filters */}
      {showFilters && (
        <Box className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <Box className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <FormControl size="small" className="min-w-[200px]">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => onStatusFilterChange(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {(searchTerm || statusFilter) && (
              <Chip
                label="Clear Filters"
                onClick={handleClearFilters}
                size="small"
                className="text-gray-600 hover:bg-gray-100 cursor-pointer"
                onDelete={handleClearFilters}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchAndFilter;
