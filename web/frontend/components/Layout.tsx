import Head from "next/head";
import Navbar from "./Nav";

interface Props {
    children: React.ReactNode
    title: string
}

const Layout: React.FC<Props> = ({
    children,
    title = "Untitled"
}: Props) => {
    return (
        <>
            <Head>
                <title>{title} | Expert Finder</title>
                <meta name="description" content="Expert Finder" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <header className="bg-white shadow">
                <Navbar title={title} />
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </>
    );
}

export default Layout;