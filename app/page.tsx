export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        StadiumOS
      </h1>
      <p className="mt-2 text-sm font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400">
        GDG Hackathon
      </p>
      <p className="mt-6 max-w-lg text-center text-lg text-zinc-600 dark:text-zinc-400">
        Boilerplate is ready. See the README for the problem statement and
        what we plan to build.
      </p>
    </main>
  );
}
