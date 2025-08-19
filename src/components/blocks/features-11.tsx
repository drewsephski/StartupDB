import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Globe } from 'lucide-react'

export function Features() {
    return (
        <section className="bg-linear-to-tr from-[#000] to-[#1A2428] py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto grid gap-2 sm:grid-cols-5">
                    <Card className="group overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl shadow-white/5 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl">
                        <div className="absolute -inset-6 [background:radial-gradient(75%_95%_at_50%_0%,transparent,hsl(var(--background))_100%)]"></div>
                        <CardHeader>
                            <div className="md:p-6">
                                <p className="font-medium text-white">Idea Management</p>
                                <p className="text-neutral-300 mt-3 max-w-sm text-sm">Your personal repository of innovative startup ideas, always accessible with a single click to capture inspiration anytime.</p>
                            </div>
                        </CardHeader>

                        <div className="relative h-fit pl-6 md:pl-12">

                            <div className="bg-background overflow-hidden rounded-tl-lg border-l border-t pl-2 pt-2 dark:bg-zinc-950">
                                <img
                                    src="https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75"
                                    className="hidden dark:block"
                                    alt="startup ideas dashboard dark"
                                    width={1207}
                                    height={929}
                                />
                                <img
                                    src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                                    className="shadow dark:hidden"
                                    alt="startup ideas dashboard light"
                                    width={1207}
                                    height={929}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="group overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl shadow-white/5 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl">
                        <div className="absolute -inset-6 [background:radial-gradient(50%_75%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                        <p className="mx-auto my-6 max-w-md text-balance px-6 text-center text-white text-lg font-semibold sm:text-2xl md:p-6">Smart Organization, Instantly find and manage all your startup ideas.</p>

                        <CardContent className="mt-auto h-fit">
                            <div className="relative mb-6 sm:mb-0">
                                <div className="aspect-76/59 overflow-hidden rounded-r-lg border">
                                    <img
                                        src="https://tailark.com/_next/image?url=%2Forigin-cal-dark.png&w=3840&q=75"
                                        className="hidden dark:block"
                                        alt="startup ideas dashboard dark"
                                        width={1207}
                                        height={929}
                                    />
                                    <img
                                        src="https://tailark.com/_next/image?url=%2Forigin-cal.png&w=3840&q=75"
                                        className="shadow dark:hidden"
                                        alt="startup ideas dashboard light"
                                        width={1207}
                                        height={929}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="group p-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl shadow-white/5 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-12">
                        <div className="absolute -inset-6 [background:radial-gradient(50%_75%_at_25%_25%,transparent,hsl(var(--background))_100%)]"></div>
                        <p className="mx-auto mb-12 max-w-md text-balance text-center text-white text-lg font-semibold sm:text-2xl">Smart Organization, Instantly find and manage all your startup ideas.</p>

                        <div className="flex justify-center gap-6">
                            <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 relative flex aspect-square size-16 items-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                                <span className="absolute right-2 top-1 block text-sm text-white">fn</span>
                                <Globe className="mt-auto size-4" />
                            </div>
                            <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 flex aspect-square size-16 items-center justify-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                                <span className="text-white">💡</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="group relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl shadow-white/5 sm:col-span-3 sm:rounded-none sm:rounded-br-xl">
                        <div className="absolute -inset-6 [background:radial-gradient(75%_95%_at_75%_75%,transparent,hsl(var(--background))_100%)]"></div>
                        <CardHeader className="p-6 md:p-12">
                            <p className="font-medium text-white">Idea Management</p>
                            <p className="text-neutral-300 mt-2 max-w-sm text-sm">Your next big idea is just a click away. Never lose a moment of inspiration again.</p>
                        </CardHeader>
                        <CardContent className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
                            <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                                    <img
                                        className="m-auto size-8 invert dark:invert-0"
                                        src="https://oxymor-ns.tailus.io/logos/linear.svg"
                                        alt="Startup Idea"
                                        width="32"
                                        height="32"
                                    />
                                </div>
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                                    <img
                                        className="m-auto size-8 invert dark:invert-0"
                                        src="https://oxymor-ns.tailus.io/logos/netlify.svg"
                                        alt="Market Research"
                                        width="32"
                                        height="32"
                                    />
                                </div>
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-4">
                                    <img
                                        className="m-auto size-8 invert dark:invert-0"
                                        src="https://oxymor-ns.tailus.io/logos/github.svg"
                                        alt="Team Collaboration"
                                        width="32"
                                        height="32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}