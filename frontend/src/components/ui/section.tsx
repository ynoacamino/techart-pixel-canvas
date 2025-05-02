function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full flex flex-col gap-20 md:gap-28 items-center my-12 md:my-36 px-5">
      {children}
    </section>
  );
}
export { Section };
