import PropTypes from "prop-types";

const LoginForm = ({
    handleSubmit,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
}) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Juan"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                <button id="login" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;
