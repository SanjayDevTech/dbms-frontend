import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	ButtonGroup,
	Paper,
	Button,
	InputBase,
	Typography,
	TextareaAutosize,
	Box,
} from "@material-ui/core";
import Header from "components/header";
import placeholder from "assets/images/placeholder.png";
import { useSelector } from "react-redux";
import { ProductType } from "utils/types";
import { backendAPI } from "services/http";
import { selectSellerAuth } from "state/slices";
import history from "utils/history";
import { BACKEND } from "utils/constants";
import Message from "components/snackbar";

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
	const [image, setImage] = React.useState<Blob | null>(null);
	const imageUrl = React.useRef({
		filename: "",
		value: "",
	});
	const [validated, setValidated] = React.useState(false);
	const [sellerProducts, setSellerProducts] = React.useState<ProductType[]>([]);
	const [snackbar, setSnackbar] = React.useState({
		msg: "",
		open: false,
	});
	const [loading, setLoading] = React.useState(false);

	const snackbarHandler = (
		event: React.SyntheticEvent | React.MouseEvent,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbar({ msg: "", open: false });
	};

	const seller = useSelector(selectSellerAuth);

	const clearAllFields = () => {
		setName("");
		setDes("");
		setPrice(0);
		setImage(null);
		imageUrl.current = { value: "", filename: "" };
	};

	const addHandler = (fileName: string) => {
		const obj: { email: string; hash: string; product: ProductType } = {
			email: seller.email,
			hash: seller.hash,
			product: {
				id: 0,
				sellerId: 0,
				name: name,
				des: des,
				price: String(price),
				image: fileName,
			},
		};
		setLoading(true);
		backendAPI
			.post<{
				status: boolean;
				error: string | null;
			}>("/products", obj)
			.then((res) => {
				if (res.status === 200 && res.data.status) {
					fetchSellerProducts();
					clearAllFields();
				} else {
					console.log("Error", res.status);
					setSnackbar({
						msg: "Error while posting product",
						open: false,
					});
				}
			})
			.catch((e) => {
				console.log(e.message);
				setSnackbar({
					msg: e.message,
					open: false,
				});
			})
			.finally(() => {
				setLoading(false);
			});
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

	const pushHandler = () => {
		if (!validated) return;
		if (image !== null) {
			setLoading(true);
			const tempImage = image;
			let data = new FormData();
			data.append("image", tempImage);
			backendAPI
				.post("/images/upload", data, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					if (res.status === 200 && res.data.status) {
						const fileName = res.data.image;
						addHandler(fileName);
					} else {
						console.log("Errrr", res.data);
						setSnackbar({
							msg: "Error while uploading image",
							open: true,
						});
					}
				})
				.catch((e) => {
					console.log(e.message);
					setSnackbar({
						msg: e.message,
						open: true,
					});
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const viewHandler = (id: number) => {
		history.push(`/product/${id}`);
	};

	const deleteHandler = (id: number) => {
		backendAPI
			.delete(`/products/${id}`, {
				data: {
					email: seller.email,
					hash: seller.hash,
				},
			})
			.then((res) => {
				const data = res.data;
				if (data.status) {
					fetchSellerProducts();
				} else {
					console.log("Error");
				}
			})
			.catch(console.log);
	};

	React.useEffect(() => {
		setValidated(Boolean(name && des && price && image));
	}, [name, des, price, image]);

	React.useEffect(() => {
		if (seller.email && seller.hash) {
			fetchSellerProducts();
		}
	}, []);

	const fetchSellerProducts = () => {
		backendAPI
			.get<ProductType[]>(`/products?email=${seller.email}&hash=${seller.hash}`)
			.then((response) => {
				setSellerProducts(response.data);
			})
			.catch((e) => {
				setSnackbar({ msg: "Error while fetching details", open: true });
			});
	};

	return (
		<div className={classes.root}>
			<Header />
			<Message
				open={snackbar.open}
				msg={snackbar.msg}
				closeHandler={snackbarHandler}
			/>
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
								disabled={loading}
							/>
						</div>
						<div className={classes.group}>
							<InputBase
								value={price}
								type={"number"}
								placeholder={"enter the price"}
								className={classes.input}
								onChange={priceHandler}
								disabled={loading}
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
								disabled={loading}
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
							disabled={loading || !validated}
							onClick={pushHandler}>
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
					{sellerProducts.map((item) => {
						let image = item.image;
						if (!item.image.startsWith("http")) {
							image = BACKEND + "res/" + item.image;
						}
						return (
							<Paper className={classes.item}>
								<Box display="flex">
									<Box display="flex" flex={1} flexDirection="column">
										<Typography className={classes.name} component={"h2"}>
											{item.name}
										</Typography>
										<Typography className={classes.price} component={"h2"}>
											{item.price} $
										</Typography>
									</Box>
									<img height={"120px"} src={image} alt={item.name} />
								</Box>
								<Box display="flex">
									<Button
										onClick={() => deleteHandler(item.id)}
										variant={"contained"}
										color={"primary"}>
										Delete
									</Button>
									<Button
										style={{ marginLeft: "5px" }}
										onClick={() => viewHandler(item.id)}
										variant={"contained"}
										color={"primary"}>
										View
									</Button>
								</Box>
							</Paper>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
