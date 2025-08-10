import { GroupMenu } from '@/components/group-menu';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface StoreLayoutProps extends PropsWithChildren {
    groups: Group[];
}

function StoreLayout({ children, groups }: StoreLayoutProps) {
    return (
        <>
            <Head title="Store">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="h-full w-full">
                        <div className="md:mx-none mx-auto flex w-full max-w-[95%] flex-col md:flex-row">
                            <div className="w-full rounded-tl-lg rounded-tr-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] md:w-[35%] lg:w-3/12 lg:rounded-tl-lg lg:rounded-tr-none lg:rounded-bl-lg lg:p-4 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                <GroupMenu groups={groups} />
                            </div>
                            <div className="flex flex-col gap-6 flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg lg:p-4 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export { StoreLayout };
