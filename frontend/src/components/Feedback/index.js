import { Snackbar, Alert } from "@mui/material";

const Feedback = ({ open, severity, message, onClose }) => {
	const position = { vertical: 'bottom', horizontal: 'right' };
	const { vertical, horizontal } = position;

	if (open) {
		return (
			<Snackbar open={open || false} autoHideDuration={10000} anchorOrigin={{ vertical, horizontal }} onClose={onClose}>
				<Alert variant="filled" severity={severity} sx={{ width: '100%', color: '#fff' }} onClose={onClose}>
				{message}
				</Alert>
			</Snackbar>
		)
	} else {
		return null;
	}
};

export default Feedback;