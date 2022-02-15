import React, {useState, useEffect} from "react";
import NetflixLogo from "../img/netflix-logo.svg"
import {Box, Button, Container, FormControl, styled, TextField, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/core";
import {withStyles} from "@mui/material";

const useStyles = makeStyles(() => ({
    input: {
        color: "white",
        borderColor: "white",
        fontFamily: "Work Sans",
    },
    textField: {
        "& .MuiFilledInput-root": {
            border: "none",
            backgroundColor: "#404040",
            color: "white",
            borderRadius: "5px",
            borderBottom: "3px solid orange"

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
            color: "orange"
        }
    },
}));

export default function Login() {

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

    const [formValues, setFormValues] = useState({
        email_or_phone: "",
        password: "",
        repeated_password: ""
    });

    const [displayUsernameHelperText, setDisplayUsernameHelperText] = useState({
        display: false,
        message: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("lol")
    }

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (formValues.email_or_phone.length === 0 || !formValues.email_or_phone.includes("@")) {
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
    }, [formValues.email_or_phone]);


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
                    backgroundColor: "rgba(0,0,0,0.7)",
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
                            helperText={"heey"}
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
                    </FormControl>
                </Box>
            </Container>
        </>
    )
}