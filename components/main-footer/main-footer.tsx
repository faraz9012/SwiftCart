import Link from 'next/link';
import { Footer_Menu, Social_Links } from '../constants/main-footer';


export default function MainFooter() {
    return <>
        <footer className="relative bg-[#e2e8f0] pt-8 pb-6">
            <div className="container mx-auto px-4 max-w-7xl ">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl fonat-semibold">Let&apos;s keep in touch!</h4>
                        <h5 className="text-lg mt-0 mb-2">
                            Find us on any of these platforms, we respond 1-2 business days.
                        </h5>
                        <div className="mt-6 lg:mb-0 mb-6 ">
                            {Social_Links.map((socialLink, index) => (
                                socialLink.subLinks && (
                                    <div key={index} className='flex '>
                                        {socialLink.subLinks.map((link, subIndex) => (
                                            <Link
                                                key={subIndex} 
                                                href={link.route || '/'} 
                                                className="bg-white shadow-lg font-normal h-10 w-10 flex items-center justify-center align-center rounded-full outline-none mr-2 group hover:text-indigo-600 group focus:outline-none focus:ring focus:ring-slate-700"
                                            >
                                                {link.icon && <link.icon className="size-5" />}
                                                <span className="sr-only">{link.icon && link.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )
                            )
                            )}
                        </div>

                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            {Footer_Menu.map((footerLink, index) => (
                                <div key={index} className={`${index === 0 ? 'ml-auto' : ''} w-full lg:w-4/12 px-4`}>
                                    <span className="block uppercase text-sm font-semibold mb-2">{footerLink.columnTitle}</span>
                                    <ul className="list-unstyled">
                                        {footerLink.subLinks && footerLink.subLinks.map((link, subIndex) => (
                                            <li key={subIndex}>
                                                <Link
                                                    className="text-gray-700 hover:text-indigo-600 font-medium block pb-2 text-sm w-fit"
                                                    href={link.route || "/"}
                                                >
                                                    {link.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <hr className="my-6" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm font-semibold py-1">
                            Copyright © 2024 SwiftCart</div>
                    </div>
                </div>
            </div>
        </footer>
    </>

}