import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [surnameError, setSurnameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter, and one number
    const [role, setRole] = useState<string>('student');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signUpError, setSignUpError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response: AxiosResponse<{ token: string, roles: string[] }> = await axios.post('https://localhost:7250/api/Signup/sign-up', {
                name,
                surname,
                email,
                password,
                role
            });
            // Handle the response here, if needed
        } catch (error: any) {
            setSignUpError(error.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = event.target.value;
        setName(nameValue);

        if (!nameValue) {
            setNameError("Name is required.");
        } else {
            setNameError("");
        }
    };

    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const surnameValue = event.target.value;
        setSurname(surnameValue);

        if (!surnameValue) {
            setSurnameError("Surname is required.");
        } else {
            setSurnameError("");
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);

        if (emailValue.indexOf("@") === -1 || !emailRegex.test(emailValue)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);

        if (!passwordRegex.test(passwordValue)) {
            setPasswordError("Password must be at least 8 characters, including one letter and one number.");
        } else {
            setPasswordError("");
        }
    };

    return (
        <div className="flex w-1/2 justify-center items-center h-screen">
            <div className="w-full p-8 h-[97vh] rounded-2xl bg-white border-2 border-gray-300 shadow-2xl">
                <h1 className="text-4xl font-bold text-purple-600">Kaydol</h1>
                <p className="text-gray-500 mt-4">Bir hesap oluştur</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-3xl focus:outline-none ${role === 'student' ? 'bg-purple-600 text-white' : 'bg-transparent'}`}
                            onClick={() => setRole('student')}
                        >
                            Öğrenci
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-3xl focus:outline-none ${role === 'instructor' ? 'bg-purple-600 text-white' : 'bg-transparent'}`}
                            onClick={() => setRole('instructor')}
                        >
                            Eğitmen
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-lg font-medium">Ad</label>
                        <input
                            type="text"
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
                            placeholder="Adınız"
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameError && <p className="text-red-500">{nameError}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-lg font-medium">Soyad</label>
                        <input
                            type="text"
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
                            placeholder="Soy adınız"
                            value={surname}
                            onChange={handleSurnameChange}
                        />
                        {surnameError && <p className="text-red-500">{surnameError}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-lg font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <p className="text-red-500">{emailError}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-lg font-medium">Şifre</label>
                        <input
                            type="password"
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
                            placeholder="Şifre"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <p className="text-red-500">{passwordError}</p>}
                    </div>
                    <div className="flex justify-between items-center">
                        <Link to="/login" className="text-purple-600 hover:underline">
                            Zaten hesabın var mı? Giriş yap
                        </Link>
                        <button type="submit" className="py-4 w-1/6 bg-purple-600 rounded-xl text-white font-bold text-lg">
                            Kaydol
                        </button>
                    </div>
                    {isLoading && <p>Yükleniyor...</p>}
                    {signUpError && <p className="text-red-500">{signUpError}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;

