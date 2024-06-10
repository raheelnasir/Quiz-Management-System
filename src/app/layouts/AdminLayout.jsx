// layouts/AdminLayout.js
import RootFooter from '@/globalcomponents/RootFooter';
import Link from 'next/link';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
    return (
        <div>

            <div className="flex  flex-row justify-start w-full overflow-hidden relative admin-container z-20 ">
                <div className="drawer  drawer-open  " style={{  maxWidth: "fit-content" }} >
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                    <div className="drawer-side bg-error    relative w-full  ">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu w-full      min-h-full bg-white text-base-content">
                            <ul className="menu w-full px-11  bg-white " style={{ paddingLeft: " 10px", paddingRight: "40px" }}>
                                <li><a>Item 1</a></li>
                                <li>
                                    <details open>
                                        <summary>Parent</summary>
                                        <ul>
                                            <li><Link href={"/adminpanel/uploadartsquiz"}>Upload Arts</Link ></li>
                                            <li><Link href={"/adminpanel/getquizresults"}>Results</Link ></li>
                                            <li>
                                                <details open>
                                                    <summary>Quiz</summary>
                                                    <ul className='flex flex-col'>
                                                        <Link className='p-3   hover:bg-gray-300 rounded-box   bg-white' href={'/adminpanel/getquiz'}>View Quiz</Link>
                                                        <Link className='p-3   hover:bg-gray-300 rounded-box   bg-white' href={"/adminpanel/uploadquiz"} >Upload Quiz</Link>

                                                    </ul>
                                                </details>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li><a>Item 3</a></li>
                            </ul>
                        </ul>

                    </div>
                </div>
                <AuthProvider>

                    <main className='w-full relative '>{children}</main>
                </AuthProvider>

            </div>
        </div>
    );
};

export default AdminLayout;
