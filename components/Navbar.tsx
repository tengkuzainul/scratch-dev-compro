import CardNav from './ui/card-nav';
import logo from '../public/logo.svg';

const Navbar = () => {
    const items = [
        {
            label: "About",
            bgColor: "rgba(255, 255, 255, 0.03)",
            textColor: "#fff",
            links: [
                { label: "Company", href: "#", ariaLabel: "About Company" },
                { label: "Careers", href: "#", ariaLabel: "About Careers" }
            ]
        },
        {
            label: "Projects",
            bgColor: "rgba(255, 255, 255, 0.03)",
            textColor: "#fff",
            links: [
                { label: "Featured", href: "#", ariaLabel: "Featured Projects" },
                { label: "Case Studies", href: "#", ariaLabel: "Project Case Studies" }
            ]
        },
        {
            label: "Contact",
            bgColor: "rgba(255, 255, 255, 0.03)",
            textColor: "#fff",
            links: [
                { label: "Email", href: "#", ariaLabel: "Email us" },
                { label: "Twitter", href: "#", ariaLabel: "Twitter" },
                { label: "LinkedIn", href: "#", ariaLabel: "LinkedIn" }
            ]
        }
    ];

    return (
        <CardNav
            logo={logo}
            logoAlt="Company Logo"
            items={items}
            baseColor="rgba(15, 12, 26, 0.75)"
            menuColor="#fff"
            buttonBgColor="#E11D48"
            buttonTextColor="#fff"
            ease="back.out(1.7)"
            theme="dark"
        />
    );
};

export default Navbar;
