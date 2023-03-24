import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function SignupForm() {
    const [formData, setFormData] = useState({
        name: "",
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
            await axios.post("/api/users", formData);
            // Redirect to the betting page after successful registration
            await router.push("/betting");
        } catch (error) {
            console.error("Error registering user:", error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            {/* Your form code here, with the onSubmit handler added */}
            <form onSubmit={handleSubmit}>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                                Sign Up
                            </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
