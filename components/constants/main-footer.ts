import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

interface footerMenu {
    icon?: any;
    title?: string;
    route?: string;
    columnTitle?: string;
    subLinks?: footerMenu[];
}

export const Footer_Menu: footerMenu[] = [
    {
        columnTitle: 'Information',
        subLinks: [
            {
                title: 'Privacy notice',
                route: '/'
            },
            {
                title: 'Condition of use',
                route: '/'
            },
            {
                title: 'Shipping & returns',
                route: '/'
            }
        ]
    },
    {
        columnTitle: 'Customer Service',
        subLinks: [
            {
                title: 'Shop',
                route: '/'
            },
            {
                title: 'About us',
                route: '/'
            },
            {
                title: 'Contact us',
                route: '/'
            },
            {
                title: 'News',
                route: '/'
            },
        ]
    }
];

export const Social_Links: footerMenu[] = [
    {
        columnTitle: 'Follow us',
        subLinks: [
            {
                icon: Facebook,
                title: 'Meta',
                route: '/'
            },
            {
                icon: Instagram,
                title: 'Instagram',
                route: '/'
            },
            {
                icon: Twitter,
                title: 'X-Twiiter',
                route: '/'
            },
            {
                icon: Youtube,
                title: 'YouTube',
                route: '/'
            },
        ]
    }
];