import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import { Card } from '@mui/material';
import Grid from '@mui/material/Grid2';

const DashboardContent = () => {
    const stats = [
        {
            title: 'Total Students',
            value: '1,234',
            icon: <SchoolIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
            color: '#e3f2fd'
        },
        {
            title: 'Total Courses',
            value: '42',
            icon: <LibraryBooksIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
            color: '#e8f5e9'
        },
        {
            title: 'Active Users',
            value: '892',
            icon: <PeopleIcon sx={{ fontSize: 40, color: '#ed6c02' }} />,
            color: '#fff3e0'
        }
    ];

    return (
        <>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                {stats.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.title}>
                        <Card
                            sx={{
                                py: 5,
                                boxShadow: 0,
                                textAlign: 'center',
                                backgroundColor: item.color,
                                borderRadius: 4
                            }}
                        >
                            <Box
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {item.icon}
                            </Box>

                            <Typography variant="h3" sx={{ mb: 1 }}>
                                {item.value}
                            </Typography>

                            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                {item.title}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default DashboardContent;