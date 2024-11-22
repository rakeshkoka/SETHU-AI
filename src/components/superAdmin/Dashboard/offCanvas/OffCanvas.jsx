import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

export const drawerWidth = 240;

function OffCanvas(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/'
        },
        {
            text: 'User Management',
            icon: <SupervisedUserCircleIcon />,
            path: '/userManagement'
        },
        {
            text: 'Course Management',
            icon: <LibraryBooksIcon />,
            path: '/courses'
        },
        {
            text: 'Reports & Analytics',
            icon: <AnalyticsIcon />,
            path: '/reports'
        },
        {
            text: 'Settings',
            icon: <SettingsIcon />,
            path: '/settings'
        }
    ];

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={item.path} >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                                {/* {openMenus[item.text] ? <ExpandLess /> : <ExpandMore />} */}
                            </ListItemButton>
                        </ListItem>
                        {/* <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.subItems.map((subItem) => (
                                    <ListItemButton key={subItem.text} sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            {subItem.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={subItem.text} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse> */}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'black',
                }}
            >
                <Toolbar sx={{ backgroundColor: '#003366' }} >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button component={Link} to="/" color='white' className='fs-3' >
                        SETHU-AI
                    </Button>

                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        color="inherit"
                        sx={{ color: 'white', textTransform: 'none', fontSize: '1rem' }}
                    // onClick={handleLogout}
                    >
                        <LoginIcon sx={{mr: 1}} />
                    </Button>

                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

OffCanvas.propTypes = {
    window: PropTypes.func,
};

export default OffCanvas;