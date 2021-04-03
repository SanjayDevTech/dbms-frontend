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
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { ShoppingCart } from "@material-ui/icons";

const CurvedButton = withStyles((theme: Theme) => ({
	root: {
		borderRadius: "0 43px 43px 0",
		width: 90,
		backgroundColor: "#1565C0",
		"&:hover": {
			backgroundColor: "#1565C0",
		},
	},
}))(IconButton);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
		},
		section: {
			display: "flex",
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
	return (
		<div className={classes.grow}>
			<AppBar className={classes.appbar} position="static">
				<Toolbar>
					<Typography variant="h6" noWrap>
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
						<IconButton aria-label="account of current user" onClick={() => {}}>
							<AccountCircle className={classes.icon} />
						</IconButton>
						<IconButton aria-label="show 17 new notifications">
							<Badge badgeContent={17} color="secondary">
								<ShoppingCart className={classes.icon} />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
