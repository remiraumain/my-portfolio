import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Projects: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>My projects</title>
        <meta name="description" content="Check out my projects" />
        {/* Change icon */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <div>Projects</div>
      </main>
    </>
  );
};

export default Projects;
