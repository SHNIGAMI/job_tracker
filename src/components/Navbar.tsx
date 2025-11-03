import { AppBar, Toolbar, Typography, Button, Box, Fab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Add as AddIcon,
  Work as WorkIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        className="bg-white border-b border-gray-200 shadow-sm"
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar className="px-4 sm:px-6 lg:px-8">
          <Box
            component={Link}
            to="/"
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            sx={{ textDecoration: "none" }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <WorkIcon className="text-white" />
            </div>
            <Typography
              variant="h6"
              component="div"
              className="font-bold text-gray-900"
            >
              JobTracker
            </Typography>
          </Box>

          <Box className="flex-1" />

          <Box className="hidden sm:flex items-center space-x-1">
            <Button
              component={Link}
              to="/add"
              startIcon={<AddIcon />}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive("/add")
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: isActive("/add")
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Add Job
            </Button>
            <Button
              component={Link}
              to="/"
              className="p-2 min-w-0 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
              sx={{
                borderRadius: "8px",
                minWidth: "auto",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ProfileIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile FAB for Add Job */}
      <Box className="sm:hidden fixed bottom-6 right-6 z-50">
        <Fab
          component={Link}
          to="/add"
          color="primary"
          className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Navbar;
