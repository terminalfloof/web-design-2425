import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';
import Image from 'next/image';

export default function MemberHighlight({
	name,
	children,
	unhoveredLink,
	hoveredLink,
	profileLink,
}: {
	name: string;
	children: ReactNode;
	unhoveredLink: string;
	hoveredLink: string;
	profileLink: string;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					className={`overflow-hidden relative bg-gradient-to-tr from-black/50 to-transparent w-1/4 group h-full hover:bg-red-900/10 flex flex-col items-start justify-end p-6 transition-colors duration-300 ease-out`}
				>
					<Image
						src={unhoveredLink}
						alt={name}
						layout="fill"
						objectFit="contain"
						className="block scale-90 -z-10 opacity-100 grayscale group-hover:opacity-0 group-hover:translate-x-0 translate-x-4 transition-all duration-300 ease-out"
					/>
					<Image
						src={hoveredLink}
						alt={name}
						layout="fill"
						objectFit="contain"
						className="opacity-0 scale-90 -z-10 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:translate-x-4 translate-x-8"
					/>

					<h3 className="transform text-lg group-hover:scale-150 origin-bottom-left group-hover:font-bold w-fit transition-transform duration-300 ease-out">
						{name.toLowerCase()}
					</h3>
				</div>
			</DialogTrigger>
			<DialogContent className="px-8 py-6">
				<DialogHeader className="flex flex-row gap-6 justify-stretch">
					<div className="basis-1/3 relative">
						<Image
							src={profileLink}
							alt={name}
							layout="fill"
							objectFit="contain"
							className="rounded-lg"
						/>
					</div>

					<div className="basis-2/3">
						<DialogTitle className="text-2xl">{name}</DialogTitle>
						<DialogDescription>{children}</DialogDescription>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
