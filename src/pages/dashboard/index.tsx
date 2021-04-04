import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	ButtonGroup,
	Paper,
	Button,
	InputBase,
	Typography,
	TextareaAutosize,
} from "@material-ui/core";
import Header from "components/header";
import placeholder from "assets/images/placeholder.png";

const listItems = [
	{ id: "0", name: "Product Name", price: "200" },
	{ id: "1", name: "Product Name", price: "200" },
	{ id: "2", name: "Product Name", price: "200" },
	{ id: "3", name: "Product Name", price: "200" },
];

const useStyles = makeStyles({
	root: {
		height: "100%",
		display: "flex",
		flexFlow: "column",
	},
	section: {
		flexGrow: 1,
		display: "flex",
		padding: "40px",
	},
	left: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		background: "#C4C4C4",
		padding: "22px",
	},
	right: {
		flex: 1,
		overflow: "auto",
		marginLeft: "50px",
		display: "flex",
		flexDirection: "column",
		background: "#C4C4C4",
		padding: "22px",
		height: "460px",
	},

	input: {
		fontWeight: 300,
		fontSize: "18px",
		lineHeight: "30px",
		marginLeft: "20px",
	},
	group: {
		background: "#EFEFEF",
		borderRadius: "44px",
		display: "flex",
		alignItems: "center",
		width: "380px",
		height: "60px",
		margin: 15,
	},
	groupImg: {
		background: "#EFEFEF",
		borderRadius: "44px",
		display: "flex",
		justifyContent: "center",
		width: "380px",
		height: "60px",
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},

	btnBar: {
		display: "flex",
		height: "40px",
		width: "100%",
		marginTop: "5px",
		"& > *": {
			flex: 1,
		},
	},
	item: {
		height: 200,
		padding: "27px",
		marginBottom: "34px",
	},
	name: {
		fontSize: "35px",
		fontWeight: "bold",
		lineHeight: "40px",
	},
	price: {
		fontWeight: "bold",
		fontSize: "28px",
		lineHeight: "38px",
		color: "#1565C0",
	},
});

const Dashboard = () => {
	const classes = useStyles();
	const [name, setName] = React.useState("");
	const [des, setDes] = React.useState("");
	const [price, setPrice] = React.useState(0);
	const [image, setImage] = React.useState(null);
	const imageUrl = React.useRef({
		filename: "",
		value: "",
	});
	const [validated, setValidated] = React.useState(false);

	const clearAllFields = () => {
		setName("");
		setDes("");
		setPrice(0);
		setImage(null);
		imageUrl.current = { value: "", filename: "" };
	};

	const addHandler = () => {
		console.log(`Name: ${name}, Des: ${des}, price: ${price}`);
	};

	const nameHandler = (e: any) => setName(e.target.value);
	const desHandler = (e: any) => setDes(e.target.value);
	const priceHandler = (e: any) => {
		const temp = Number(e.target.value);
		if (temp >= 0) {
			setPrice(temp);
		}
	};
	const imageHandler = (e: any) => {
		const file = e.target.files[0];
		imageUrl.current = {
			value: file ? URL.createObjectURL(file) : "",
			filename: file ? file.filename : "",
		};
		setImage(file);
	};

	React.useEffect(() => {
		setValidated(Boolean(name && des && price && image));
	}, [name, des, price, image]);

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.section}>
				<div className={classes.left}>
					<Paper className={classes.paper}>
						<div className={classes.group}>
							<InputBase
								value={name}
								type={"text"}
								placeholder={"enter the product name"}
								className={classes.input}
								onChange={nameHandler}
							/>
						</div>
						<div className={classes.group}>
							<InputBase
								value={price}
								type={"number"}
								placeholder={"enter the price"}
								className={classes.input}
								onChange={priceHandler}
							/>
						</div>
						<div className={classes.group}>
							<input
								type={"file"}
								value={imageUrl.current.filename}
								placeholder={"cover image"}
								className={classes.input}
								onChange={imageHandler}
								accept={"image/*"}
							/>
						</div>
						<div
							style={{ height: 60, maxHeight: 100 }}
							className={classes.groupImg}>
							<img
								style={{ height: "100%" }}
								src={imageUrl.current.value || placeholder}
								alt="preview"
							/>
						</div>
						<div style={{ height: "max-content" }} className={classes.group}>
							<TextareaAutosize
								value={des}
								className={classes.input}
								placeholder={"Description"}
								onChange={desHandler}
								style={{
									outline: "none",
									border: "none",
									background: "transparent",
								}}
							/>
						</div>
					</Paper>
					<ButtonGroup className={classes.btnBar} color={"secondary"}>
						<Button
							variant={"contained"}
							disabled={!validated}
							onClick={addHandler}>
							Add
						</Button>
						<Button
							onClick={clearAllFields}
							variant={"text"}
							style={{ background: "#FFF" }}>
							Reset
						</Button>
					</ButtonGroup>
				</div>
				<div className={classes.right}>
					{listItems.map((item) => (
						<Paper className={classes.item}>
							<Typography className={classes.name} component={"h2"}>
								{item.name}
							</Typography>
							<Typography className={classes.price} component={"h2"}>
								{item.price} $
							</Typography>
							<Button variant={"contained"} color={"primary"}>
								Delete
							</Button>
						</Paper>
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
