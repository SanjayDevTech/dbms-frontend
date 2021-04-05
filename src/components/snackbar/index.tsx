import { Snackbar, IconButton, Button } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import MessagePropsI from "./types";

const Message = (props: MessagePropsI) => {
	const { open, closeHandler, msg } = props;
	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			open={open}
			autoHideDuration={4000}
			onClose={closeHandler}
			message={msg || "No message"}
			action={
				<>
					<Button color="secondary" size="small" onClick={closeHandler}>
						DISMISS
					</Button>
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={closeHandler}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</>
			}
		/>
	);
};

export default Message;
