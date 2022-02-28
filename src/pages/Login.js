import React, {useState, useEffect} from "react";
import NetflixLogo from "../img/netflix-logo.svg";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    styled,
    TextField,
    Typography,
    checkboxClasses
} from "@mui/material";
import {makeStyles} from "@material-ui/core";
import FacebookLogo from "../img/facebook-logo.svg";
import {facebookProvider} from '../config/authMethods';
import socialMediaAuth from "../service/auth";
import axios from "axios";
import { useSnackbar } from "notistack";

const API_URL = "http://localhost:3001";

const useStyles = makeStyles(() => ({
    input: {
        color: "white",
        borderColor: "white",
        fontFamily: "Work Sans",
    },
    checkboxLabel: {
        "& .MuiFormControlLabel-root": {
            color: "#616161",
            fontWeight: "bold"
        },
        "& .Mui-checked": {
            color: "white"
        }
    },
    textField: {
        "& .MuiFilledInput-root": {
            border: "none",
            backgroundColor: "#404040",
            color: "white",
            borderRadius: "5px",
            borderBottom: "3px solid #ff7e46"

        },
        "&:hover .MuiFilledInput-root": {
            backgroundColor: "#616161"
        },
        "&:focused .MuiFilledInput-underline": {
            borderBottom: "3px solid red"
        },
        "& .MuiFilledInput-root.Mui-focused": {
            backgroundColor: "#616161"
        },
        "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#404040"
        },
        "& .MuiOutlinedInput-input": {
            backgroundColor: "white",
        },
        "&:hover .MuiFilledInput-input": {

        },
        "& .MuiFilledInput-root.Mui-focused .MuiFilledInput-input": {
            color: "white"
        },
        "& .MuiInputLabel-filled": {
            color: "#939393",
            fontWeight: "medium"
        },
        "& .MuiInputLabel-filled.Mui-focused": {
            color: "#939393",
            fontWeight: "medium"
        },
        "&:hover .MuiInputLabel-filled": {

        },
        "& .MuiInputLabel-outlined.Mui-focused": {},
        "& .MuiFormHelperText-root": {
            color: "#ff7e46"
        }
    },
    checkbox: {
        "& .MuiCheckbox-root": {
            backgroundColor: "white"
        },
        "& .Mui-checked": {
            backgroundColor: "white"
        }
    }
}));

export default function Login() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [rememberMe, setRememberMe] = useState(false);
    let classes = useStyles();

    const SignInButton = styled(Button)({
        backgroundColor: "#E50914",
        textTransform: "none",
        fontSize: "1em",
        padding: "10px",
        fontWeight: "bold",
        fontFamily: "Roboto",
        marginTop: "20px",
        "&:hover": {
            backgroundColor: "#E50914",
        }
    });

    const FacebookButton = styled(Button)({
        textTransform: "none",
        color: "#828282"
    })

    const [formValues, setFormValues] = useState({
        email_or_phone: "",
        password: "",
        remember_me: false
    });

    const [displayUsernameHelperText, setDisplayUsernameHelperText] = useState({
        display: false,
        message: ""
    });

    const [displayPasswordHelperText, setDisplayPasswordHelperText] = useState({
        display: false,
        message: ""
    });

    useEffect(() => {
        if (localStorage.getItem("user") != null && localStorage.getItem("user") !== undefined) {
            let user = JSON.parse(localStorage.getItem("user"))
            setFormValues({
                email_or_phone: user.email,
                password: user.password,
                remember_me: true
            })
        } else {
            setFormValues({
                email_or_phone: "",
                password: "",
                remember_me: false
            })
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (displayUsernameHelperText.display || displayPasswordHelperText.display) {
            enqueueSnackbar("Please fill the username and password fields obeying the rules written beneath the text fields.", {variant: "warning"})
            return
        }
        axios.post(API_URL + "/auth/login", {
            email: formValues.email_or_phone,
            password: formValues.password
        }).then((response) => {
            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify({
                    email: formValues.email_or_phone,
                    password: formValues.password
                }))
            }
            enqueueSnackbar(response.data.message, {variant: "success"})
        }).catch((error) => {
            enqueueSnackbar(error.response.data.message, {variant: "error"})
        })
    }

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeRememberMe = () => setRememberMe(!rememberMe)

    useEffect(() => {
        if (formValues.email_or_phone != null && formValues.email_or_phone.length === 0 || !formValues.email_or_phone.includes("@")) {
            setDisplayUsernameHelperText({
                display: true,
                message: "Please enter a valid username or email"
            })
        } else {
            setDisplayUsernameHelperText({
                display: false,
                message: ""
            })
        }

        if (formValues.password.length < 4 || formValues.password.length > 40) {
            setDisplayPasswordHelperText({
                display: true,
                message: "Your password must contain between 4 and 60 characters."
            })
        } else {
            setDisplayPasswordHelperText({
                display: false,
                message: ""
            })
        }
    }, [formValues]);

    const handleFacebookLogin = async (provider)=>{
        const res = await socialMediaAuth(provider);
        console.log(res);        
    };

    return(
        <>
            <img style={{
                position: "absolute",
                top: "-20px",
                left: "70px",
                width: "250px"
            }} src={NetflixLogo} />
            <Container maxWidth={"sm"} style={{height: "100vh"}} sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    padding: "50px 70px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "5px"
                }}>
                    <Typography sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "2.2em",
                        fontFamily: "Roboto",
                        marginBottom: "30px"
                    }}>
                        Sign In
                    </Typography>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                helperText={displayUsernameHelperText.display && displayUsernameHelperText.message}
                                color={"warning"}
                                variant={"filled"}
                                label={"Email or phone number"}
                                id={"email-or-phone-number"}
                                onChange={handleChange}
                                value={formValues.email_or_phone}
                                name={"email_or_phone"}
                                className={classes.textField}
                                style={{marginBottom: "10px"}}
                                inputProps={{ className: classes.input }}/>
                            <TextField
                                helperText={displayPasswordHelperText.display && displayPasswordHelperText.message}
                                variant={"filled"}
                                label={"Password"}
                                id={"password"}
                                onChange={handleChange}
                                value={formValues.password}
                                name={"password"}
                                className={classes.textField}
                                inputProps={{ className: classes.input }}
                                type={"password"}
                            />
                            <SignInButton variant={"contained"} type={"submit"}>Sign In</SignInButton>
                        </FormGroup>
                        <FormGroup row={true} sx={{
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <FormControlLabel className={classes.checkboxLabel} control={
                                <Checkbox name={"remember_me"}
                                          checked={rememberMe}
                                          onChange={handleChangeRememberMe}
                                          className={classes.checkbox}
                                          sx={{
                                            [`&, &.${checkboxClasses.checked}`]:
                                                {
                                                    color: '#828282',
                                                },
                                          }}
                                />
                            } label={<p style={{color: "#828282", fontWeight: "medium"}}>Remember me</p>} />
                            <a style={{
                                color: "#828282",
                                textDecoration: "none",
                                fontWeight: "medium"
                            }} href={"#"}>Need help?</a>
                        </FormGroup>
                        <FormGroup row={true} sx={{
                            alignContent: "flex-start",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            marginTop: "20px"
                        }}>
                            <FacebookButton onClick={() => handleFacebookLogin(facebookProvider)} disableRipple startIcon={<img width={"20px"} src={FacebookLogo} />}>
                                Login with Facebook
                            </FacebookButton>
                        </FormGroup>
                        <FormGroup row={true} sx={{
                            alignContent: "flex-start",
                            alignItems: "flex-start",
                            marginTop: "10px"
                        }}>
                            <span style={{color: "#828282", marginRight: "5px", fontSize: "1.1em"}}>New to Netflix?</span>
                            <a href={"#"} style={{
                                textDecoration: "none",
                                fontSize: "1.1em",
                                color: "white"
                            }}>Sign up now</a>
                        </FormGroup>
                    </FormControl>
                </Box>
            </Container>
        </>
    )
}