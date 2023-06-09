import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Welcome to my folio!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Hello world!</div>
      </main>
    </>
  );
};

export default Home;
