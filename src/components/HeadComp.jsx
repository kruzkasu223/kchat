import Head from "next/head";

export default function HeadComp() {
    return (
        <Head>
            <title>KCHAT</title>
            <meta
                name="description"
                content="Kind of WhatsApp Clone using NextJS anf Firebase"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
