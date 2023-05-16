import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function SignInForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Check if user exists in the database
            const userResponse = await axios.get(`/api/auth?email=${formData.email}`);
            const user = userResponse.data;

            if (!user) {
                throw new Error("User not found");
            }

            // Authenticate the user using the provided password
            const response = await axios.post("/api/auth", formData);

            // Check if authentication is successful
            if (response.status === 200) {
                // Store session data in local storage or state
                const session = response.data;
                console.log("Session:", session);

                // Redirect to the betting page after successful login
                await router.push("/betting");
                alert("Login successful!");
            } else {
                // Handle authentication error
                throw new Error("Authentication failed");
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Server error
                alert("Server error. Please try again later.");
                console.error("Server error:", error.message);
            } else {
                // Other error
                alert(
                    "Error logging in: " +
                    (error.response?.data?.message || error.message)
                );
                console.error(
                    "Error logging in:",
                    error.response?.data?.message || error.message
                );
            }
        }
    };

    return (
        <div>
            {/* Your form code here, with the onSubmit handler added */}
            <form onSubmit={handleSubmit}>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h1 className="text-2xl font-semibold mb-6 text-center">
                            Sign In
                        </h1>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                data-cy="signin-email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                data-cy="signin-password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            data-cy="signin-submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
