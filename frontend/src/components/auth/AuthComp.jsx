import React,{useEffect} from 'react'
import {useAuth0} from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import {Box, Card, CardContent, Typography, Button, CircularProgress, Alert, Container, Stack, Fade, LinearProgress} from '@mui/material';
import {
    Login as LoginIcon,
    PersonAdd as PersonAddIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';

const AuthComp = () => {
    const {isAuthenticated, isLoading, loginWithRedirect, error} = useAuth0();
    const navigate=useNavigate();
    useEffect(()=>{
        if(isAuthenticated && !isLoading){
            navigate("/profile");
        }
    },[isAuthenticated, navigate, isLoading]);
    
    useEffect(()=>{
        if(isAuthenticated && !isLoading){
            navigate("/profile");
        } 
    },[isAuthenticated, navigate, isLoading]);

    if(isLoading){
        return (
            
                <Container maxWidth="sm">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="400px"
                    >
                        <Fade in={true}>
                            <Card
                                elevation={8}
                                sx={{
                                    width:'100%',
                                    background:'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                    color:'white'
                                }}
                            >
                                <CardContent sx={{p:4}}>
                                    <Box textAlign="center" mb={3}>
                                        <CircularProgress
                                            size={60}
                                            sx={{color:'white', mb:2}}
                                        />
                                        <Typography vaariant="h5" component="h2" fontWeight="bold" gutterBottom>
                                            Checking authentication status
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        sx={{
                                            backgroundColor:'rgba(255,255,255,0.2)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor:'white'
                                            }
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Fade>
                    </Box>
                </Container>  
        );
    }
    if(error){
        return(
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="400px"
                >
                    <Fade in={true}>
                        <Card elevations={8} sx={{width: '100%'}}>
                            <CardContent sx={{p: 4}}>
                                <Alert
                                    severity="error"
                                    sx={{mb:3}}
                                    variant="filled"
                                >
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Authentication Error
                                    </Typography>
                                    <Typography variant="body2">
                                        {error.message}
                                    </Typography>
                                </Alert>
                                <Box textAlign="center">
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<RefreshIcon/>}
                                        onClick={()=>window.location.reload()}
                                        sx={{
                                            minWidth:200,
                                            py:1.5,
                                            fontWeight:'bold'
                                        }}
                                    >
                                        Try Again
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Fade>
                </Box>
            </Container>
        );
    }
    
    return (
    <>
        <Container maxWidth="sm">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="400px"
                >
                    <Fade in={true}>
                        <Card 
                            elevations={12} 
                            sx={{
                                width: '100%',
                                maxWidth:480,
                                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                color:'white',
                                borderRadius:3
                                }}>
                                <CardContent sx={{p: 4}}>
                                <Box textAlign="center"mb={4}>
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{
                                            background: 'linear-gradient(45deg, #ffffff, 30%, #e3f2fd 90%)',
                                            WebkitBackgroundClip:'transparent',
                                            backgroundClip:'text'
                                        }}
                                        
                                    >
                                        Welcome!
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                           color: 'rgba(255,255,255,0.9)',
                                           fontWeight:400
                                        }}
                                        
                                    >
                                        Sign in to continue
                                    </Typography>
                                </Box>
                                <Stack spacing={3}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        startIcon={<LoginIcon/>}
                                        onClick={()=>loginWithRedirect()}
                                        disabled={isLoading}
                                        sx={{
                                            backgroundColor:"white",
                                            color:'primary.main',
                                            py:1.5,
                                            fontWeight:'bold',
                                            fontSize:'1.1rem',
                                            '&:hover':{
                                                backgroundColor:'rgba(255,255,255,0.9',
                                                transform:'translateY(-2px)',
                                                boxShadow:'0 8px 25px rgba(0,0,0,0.2)'
                                            },
                                            '&:disabled':{
                                                backgroundColor:'rgba(255,255,255,255,0.7',
                                                color:'rgba(25,118,210,0.7)'
                                            },
                                            transition:'all 0.3s ease'
                                        }}
                                       
                                    >
                                         {isLoading ? 'Loading...' : 'Sign In'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        startIcon={<PersonAddIcon/>}
                                        onClick={()=>loginWithRedirect({
                                            authorizedParams: {screen_hint:'signup'}
                                        })}
                                        disabled={isLoading}
                                        sx={{
                                            borderColor:'white',
                                            color:'white',
                                            py:1.5,
                                            fontWeight:'bold',
                                            fontSize:'1.1rem',
                                            borderWidth:2,
                                            '&:hover':{
                                                backgroundColor:"white",
                                                color:'primary.main',
                                                borderColor:'white',
                                                transform:'translateY(-2px)',
                                                boxShadow:'0 8px 25px rgba(0,0,0,0.2)'
                                            },
                                            '&:disabled':{
                                                backgroundColor:'rgba(255,255,255,255,0.7',
                                                color:'rgba(25,118,210,0.7)'
                                            },
                                            transition:'all 0.3s ease'
                                        }}
                                    >
                                         {isLoading ? 'Loading...' : 'Sign In'}
                                    </Button>
                                    
                                </Stack>
                            </CardContent>
                        </Card>
                    </Fade>
                </Box>
            </Container>
    </>
  )
}

export default AuthComp