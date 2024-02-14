import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../redux/AuthSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';


const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const loginError = useSelector((state: RootState) => state.auth.error);
    const [role, setRole] = useState<string>('student');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);

        if (emailValue.indexOf('@') === -1 || !emailRegex.test(emailValue)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);

        if (passwordValue.length < 8 || passwordValue.length > 24) {
            setPasswordError('Password must be between 8 and 24 characters.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (emailError || passwordError) {
            return;
        }

        dispatch(login({ email, password })).then(() => {
            //  navigate to ...
            navigate('/');
        });
    };



    return (
        <div className="flex w-1/3 justify-center items-center h-screen">
            <div className="w-full h-[70vh] p-8 rounded-2xl bg-white border-2 border-gray-300 shadow-2xl">
                <h1 className="text-4xl font-bold text-purple-600">Giriş yap</h1>
                <p className="text-gray-500 mt-4">Hesabına Giriş yap</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-lg font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
                            placeholder="E-mail"
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
                        <button type="submit" className="py-4 w-1/6 bg-purple-600 rounded-xl text-white font-bold text-lg">
                            Giriş yap
                        </button>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className="">
                            <p className="text-gray-500">Henüz hesabınız yok mu? <Link to="/sign-up" className="text-purple-600 hover:underline">Kaydol</Link></p>
                        </div>
                        <div className="">
                            <Link to="#" className="text-purple-600 hover:underline">Şifrenizi mi unuttunuz?</Link>
                        </div>
                    </div>

                    {isLoading && <p>Loading...</p>}
                    {loginError && <p className="text-red-500">{loginError}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
