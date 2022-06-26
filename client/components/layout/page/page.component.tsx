import Head from 'next/head';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header.component';

export const PageLayout = ({
	children,
	head,
}: {
	children: JSX.Element;
	head: { title: string; description: string };
}) => {
	return (
		<>
			<Head>
				<title>{head.title}</title>
				<meta name="description" content={head.description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />

			{children}

			<Footer />
		</>
	);
};
