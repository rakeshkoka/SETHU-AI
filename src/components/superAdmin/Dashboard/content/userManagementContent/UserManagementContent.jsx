import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { FaUserTie, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function UserManagementContent() {
  const navigate = useNavigate();

  const managementCards = [
    {
      title: 'Tenant Management',
      description: 'Add/Edit/Delete Admins',
      icon: <FaUserTie size={50} />,
      onClick: () => navigate('/admin-management'),
    },
    {
      title: 'Student Management',
      description: 'View/Edit/Delete profiles\nEnrollment history',
      icon: <FaUserGraduate size={50} />,
      onClick: () => navigate('/student-management'),
    },
    {
      title: 'Instructor Management',
      description: 'Assign courses\nView performance\nManage schedules',
      icon: <FaChalkboardTeacher size={50} />,
      onClick: () => navigate('/instructor-management'),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        User Management
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr', // Single column on small screens
            sm: 'repeat(2, 1fr)', // Two columns on medium screens
            md: 'repeat(3, 1fr)', // Three columns on large screens
          },
          gap: 3,
        }}
      >
        {managementCards.map((card, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            <CardActionArea onClick={card.onClick}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{card.icon}</Box>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default UserManagementContent;
