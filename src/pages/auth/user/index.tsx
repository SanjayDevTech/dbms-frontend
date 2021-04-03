import Auth from "components/auth";

const UserAuthPage = () => {
	const authHandler = (email: string, pwd: string, mode: string) => {
		console.log(`User => Email: ${email}, Pwd: ${pwd}, Mode: ${mode}`);
	};

	return <Auth option="user" handler={authHandler} />;
};

export default UserAuthPage;
