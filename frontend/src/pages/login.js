'use client'
import {useState, useEffect} from 'react'
import {useLogin} from '@/hooks/useLogin'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/router'

//Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';



const defaultTheme = createTheme();

export default function Login () {
    const {user, loading} = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if(user && !loading) {
            router.push({pathname: "/", query: {showMessage: true, message: "Logged in"}})
            return 
        }

    }, [user, loading, router])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
                        >
                        Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    )
}