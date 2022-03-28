import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex w-3/4 mx-auto h-screen items-center justify-center text-center">
			<div>
				<h1 className="text-5xl font-bold mb-6 -mt-72 leading-10">
					Welcome to AGORA
				</h1>
				<p className="text-2xl">
					The first blockchain-based comments widget powered by Lens Protocol. We
					bridge the gap between Web2 and Web3 discussions. Agora can be embedded on
					established websites allowing users to comment and reply using their
					wallets.{' '}
					<span className="font-semibold text-accent-200 hover:text-accent-300">
						<Link href="/feeds">See what everyone's talking about!</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
