import Link from 'next/link';
import { useContext } from 'react';
import style from '../../styles/Nav.module.css';
import { DataContext } from './Provider';

function Nav() {
	const { user } = useContext(DataContext);
	return (
		<div className="flex py-4 text-primary border-b mb-6 items-center">
			<div className="mr-10 text-3xl font-[Helvetica_Neue] font-extralight tracking-widest">
				AGORA
			</div>
			<nav className="w-full">
				<ul className="flex">
					<li className="hover:text-accent-200 ease-in-out duration-150 font-bold mr-4 -ml-2 px-2 py-1 rounded-md">
						<Link href="/">Home</Link>
					</li>
					{user ? (
						<li className="hover:text-accent-200 ease-in-out duration-150 font-bold mr-4 px-2 py-1 rounded-md">
							<Link href="/profile">Profile</Link>
						</li>
					) : null}
					{user ? (
						<li className="hover:text-accent-200 ease-in-out duration-150 font-bold mr-4 px-2 py-1 rounded-md">
							<Link href="/feeds">Feed</Link>
						</li>
					) : null}
					{!user ? (
						<li className="hover:text-accent-200 ease-in-out duration-150 font-bold mr-4 px-2 py-1 rounded-md">
							<Link href="/login">Login</Link>
						</li>
					) : null}
					{user ? (
						<li className="hover:text-error ease-in-out duration-150 font-bold px-2 py-1 rounded-md ml-auto">
							<Link href="/logout">Logout</Link>
						</li>
					) : null}
				</ul>
			</nav>
		</div>
	);
}

export default Nav;
