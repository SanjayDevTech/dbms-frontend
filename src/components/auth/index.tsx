import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { InputBase, Button, ButtonGroup } from "@material-ui/core";
import { Lock, Mail } from "@material-ui/icons";
import Message from "components/snackbar";

const useStyles = makeStyles({
	root: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	form: {
		borderRadius: "48px",
		width: "480px",
		height: "420px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
	},
	input: {
		fontWeight: 300,
		fontSize: "20px",
		lineHeight: "32px",
	},
	group: {
		background: "#EFEFEF",
		borderRadius: "44px",
		display: "flex",
		alignItems: "center",
		width: "380px",
		height: "60px",
	},
	icon: {
		width: 40,
		height: 40,
		margin: 16,
	},
	inputBox: {
		display: "flex",
		flexDirection: "column",
		height: "150px",
		justifyContent: "space-between",
	},
	btn: {
		borderRadius: "47px",
		height: "53px",
		minWidth: "180px",
		fontSize: "16px",
		fontWeight: "bold",
	},
	btnBar: {
		marginTop: "30px",
	},
});

const Auth = (props: {
	option: string;
	handler: (email: any, pwd: any, mode: string) => void;
	error: any;
}) => {
	const classes = useStyles();

	const [authMode, setAuthMode] = React.useState("login");
	const [email, setEmail] = React.useState("");
	const [pwd, setPwd] = React.useState("");
	const [snackbar, setSnackbar] = React.useState(false);

	React.useEffect(() => {
		if (props.error.error) {
			setSnackbar(true);
		}
	}, [props.error]);

	const snackbarHandler = (
		event: React.SyntheticEvent | React.MouseEvent,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbar(false);
	};

	const authHandler = () => {
		props.handler(email, pwd, authMode);
	};

	const emailHandler = (e: any) => {
		setEmail(e.target.value);
	};

	const pwdHandler = (e: any) => {
		setPwd(e.target.value);
	};

	const setLoginMode = () => {
		setAuthMode("login");
	};

	const setSignUpMode = () => {
		setAuthMode("signup");
	};

	const theme = props.option === "user" ? "secondary" : "primary";
	const bg = props.option === "user" ? "#E5E5E5" : "rgba(21, 101, 192, 0.8)";

	return (
		<div style={{ background: bg }} className={classes.root}>
			<Message
				open={snackbar}
				msg={props.error.error}
				closeHandler={snackbarHandler}
			/>
			<Card className={classes.form}>
				<div className={classes.inputBox}>
					<div className={classes.group}>
						<Mail className={classes.icon} />
						<InputBase
							value={email}
							type={"email"}
							placeholder={"Enter ur email id"}
							className={classes.input}
							onChange={emailHandler}
						/>
					</div>
					<div className={classes.group}>
						<Lock className={classes.icon} />
						<InputBase
							value={pwd}
							type={"password"}
							placeholder={"Shhhh... its secret"}
							className={classes.input}
							onChange={pwdHandler}
						/>
					</div>
				</div>
				<div>
					<Button
						onClick={authHandler}
						className={classes.btn}
						variant="contained"
						color={theme}>
						{authMode === "login" ? "Login" : "Sign Up"}
					</Button>
				</div>
			</Card>
			<ButtonGroup className={classes.btnBar} color={theme}>
				<Button
					style={{
						background: authMode === "login" ? undefined : "#FFF",
					}}
					onClick={setLoginMode}
					className={classes.btn}
					variant={authMode === "login" ? "contained" : "text"}>
					already a customer?
				</Button>
				<Button
					style={{
						background: authMode === "login" ? "#FFF" : undefined,
					}}
					onClick={setSignUpMode}
					className={classes.btn}
					variant={authMode === "login" ? "text" : "contained"}>
					new customer?
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default Auth;
