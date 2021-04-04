import React from "react";
import {
	makeStyles,
	Theme,
	createStyles,
	withStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { ShoppingCart } from "@material-ui/icons";
import history from "utils/history";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, selectUserAuth, selectSellerAuth } from "state/slices";
import { AuthAction } from "state/actions";

const CurvedButton = withStyles((theme: Theme) => ({
	root: {
		borderRadius: "0 43px 43px 0",
		width: 90,
		backgroundColor: theme.palette.secondary.main,
		"&:hover": {
			backgroundColor: theme.palette.secondary.main,
		},
	},
}))(IconButton);

const JoinButton = withStyles((theme: Theme) => ({
	root: {
		width: 60,
		height: 40,
		borderRadius: "15px",
		backgroundColor: "#FFF",
		color: theme.palette.secondary.main,
		"&:hover": {
			backgroundColor: "#FFF",
		},
		marginLeft: "5px",
	},
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		grow: {
			flexGrow: 1,
		},
		appbar: {
			padding: theme.spacing(1),
		},
		search: {
			borderRadius: 40,
			width: 776,
			display: "flex",
			backgroundColor: "#FFF",
			paddingLeft: theme.spacing(2),
		},
		input: {
			flexGrow: 1,
			paddingLeft: theme.spacing(2),
			margin: "0 10px",
		},
		section: {
			display: "flex",
			alignItems: "center",
		},
		icon: {
			color: "#FFF",
			width: 30,
			height: 30,
		},
	})
);

const Header = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [logoutEl, setLogoutEl] = React.useState<null | HTMLElement>(null);

	const dispatch = useDispatch();

	const cart = useSelector(selectCart);
	const user = useSelector(selectUserAuth);
	const seller = useSelector(selectSellerAuth);

	const handleJoinClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setLogoutEl(event.currentTarget);
	};

	const sellerDashboardNavHandler = () => {
		history.push("/dashboard");
	};

	const handleJoinClose = () => {
		setAnchorEl(null);
	};

	const handleLogoutClose = () => {
		setLogoutEl(null);
	};

	const handleUserLogout = () => {
		dispatch(AuthAction.userLogoutAuth());
		handleLogoutClose();
	};

	const handleSellerLogout = () => {
		dispatch(AuthAction.sellerLogoutAuth());
		handleLogoutClose();
	};

	const userNavHandler = () => {
		history.push("/auth/user");
	};

	const sellerNavHandler = () => {
		history.push("/auth/seller");
	};

	const cartNavHandler = () => {
		history.push("/cart");
	};

	const homeNavHandler = () => {
		history.push("/");
	};

	return (
		<div className={classes.root}>
			<div className={classes.grow}>
				<AppBar className={classes.appbar} position="static">
					<Toolbar>
						<Typography onClick={homeNavHandler} variant="h6" noWrap>
							E Commerce
						</Typography>
						<div className={classes.grow} />
						<div className={classes.search}>
							<InputBase
								placeholder={"Search products, accessories"}
								className={classes.input}
							/>
							<CurvedButton>
								<SearchIcon className={classes.icon} />
							</CurvedButton>
						</div>
						<div className={classes.grow} />
						<div className={classes.section}>
							{seller.email && seller.hash && (
								<IconButton
									aria-label="account of current user"
									onClick={sellerDashboardNavHandler}>
									<AccountCircle className={classes.icon} />
								</IconButton>
							)}
							{(!(user.email && user.hash) ||
								!(seller.email && seller.hash)) && (
								<>
									<JoinButton
										aria-controls="simple-menu"
										aria-haspopup="true"
										onClick={handleJoinClick}>
										JOIN
									</JoinButton>
									<Menu
										id="simple-menu"
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={handleJoinClose}>
										{!(user.email && user.hash) && (
											<MenuItem onClick={userNavHandler}>Join as user</MenuItem>
										)}
										{!(seller.email && seller.hash) && (
											<MenuItem onClick={sellerNavHandler}>
												Join as seller
											</MenuItem>
										)}
									</Menu>
								</>
							)}
							{((user.email && user.hash) || (seller.email && seller.hash)) && (
								<>
									<JoinButton
										aria-controls="logout"
										aria-haspopup="true"
										onClick={handleLogoutClick}>
										LOGOUT
									</JoinButton>
									<Menu
										id="logout"
										anchorEl={logoutEl}
										keepMounted
										open={Boolean(logoutEl)}
										onClose={handleLogoutClose}>
										{user.email && user.hash && (
											<MenuItem onClick={handleUserLogout}>
												Logout as user
											</MenuItem>
										)}
										{seller.email && seller.hash && (
											<MenuItem onClick={handleSellerLogout}>
												Logout as seller
											</MenuItem>
										)}
									</Menu>
								</>
							)}
							<IconButton onClick={cartNavHandler}>
								<Badge badgeContent={cart.length} color="secondary">
									<ShoppingCart className={classes.icon} />
								</Badge>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</div>
	);
};

export default Header;
