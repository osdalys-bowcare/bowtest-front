import { TabsDemo } from "@/components/tabs-demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-sm lg:flex">
        <TabsDemo/>
      </div>
    </main>
  );
}
