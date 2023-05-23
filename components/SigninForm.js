import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function SignInForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("/api/signin", formData);
            // Redirect to the betting page after successful login
            await router.push("/betting");

            // After successful login
            setMessage("Logged in successfully!");

            // alert("Logged in successfully!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            alert("Error logging in: " + errorMessage);
            console.error("Error logging in:", errorMessage);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>
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
                        <button type="submit" data-cy="signin-submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;