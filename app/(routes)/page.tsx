import MemberHighlight from '@/components/member-highlight';

export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<>
			{/* Contain the video */}
			<div className="flex flex-col justify-center relative h-[66vh] pl-12">
				<h1 className="text-4xl my-2">We are Stage Fright.</h1>
				<p className="w-2/5">
					Stage Fright was founded to merge the members&apos; love of
					theatrics with the flair and style of Rock and Roll! In the
					spirit of both art and rebellion, the band believes in
					accessibility and expression for all. For this reason, all
					tickets to our upcoming national tour can be bought through
					our website without the need to go through unethical third
					parties. Thank you all for your support. Keep livin&apos;
					live on the stage, and keep on rocking!
				</p>
				<div className="w-1/2 h-full from-black opacity-90 from-20% to-transparent bg-gradient-to-r absolute left-0 top-0 -z-10"></div>
				<video
					src="/api/media/file/bocchi.mp4"
					// controls
					autoPlay
					loop
					muted
					className="absolute w-full h-full object-cover top-0 left-0 -z-20 opacity-50"
				></video>
			</div>
			{/* make the musicians or smth */}
			<div className="flex h-64">
				<MemberHighlight
					hoveredLink="/api/media/file/rui-alt.png"
					unhoveredLink="/api/media/file/rui-normal.png"
					profileLink="/api/media/file/rui-profile.png"
					name="Kamishiro Rui"
				>
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
				</MemberHighlight>
				<MemberHighlight
					hoveredLink="/api/media/file/rui-alt.png"
					unhoveredLink="/api/media/file/rui-normal.png"
					profileLink="/api/media/file/rui-profile.png"
					name="Kamishiro Rui"
				>
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
				</MemberHighlight>
				<MemberHighlight
					hoveredLink="/api/media/file/rui-alt.png"
					unhoveredLink="/api/media/file/rui-normal.png"
					profileLink="/api/media/file/rui-profile.png"
					name="Kamishiro Rui"
				>
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
				</MemberHighlight>
				<MemberHighlight
					hoveredLink="/api/media/file/rui-alt.png"
					unhoveredLink="/api/media/file/rui-normal.png"
					profileLink="/api/media/file/rui-profile.png"
					name="Kamishiro Rui"
				>
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
					This thing is keeping me hostage, please come and help me D:
				</MemberHighlight>
			</div>
		</>
	);
}
