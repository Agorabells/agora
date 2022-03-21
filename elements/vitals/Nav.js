import Link from 'next/link';
import { useContext } from 'react';
import style from '../../styles/Nav.module.css';
import { DataContext } from '../../elements/vitals/Provider';

const Nav = () => {
	const { user } = useContext(DataContext);
	return (
		<nav className={style.nav}>
		<ul>
			<li><Link href="/">Home</Link></li>
		{ user ? (
			<li><Link href="/profile">Profile</Link></li>
		) : null }
		{ !user ? (
			<li><Link href="/login">Login</Link></li>
		) : null }
		{ user ? (
			<li><Link href="/logout">Logout</Link></li>
		) : null }
		</ul>

		</nav>
	)
}

export default Nav;
