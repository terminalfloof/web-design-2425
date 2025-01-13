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
					src="/api/media/file/Band.mp4"
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
					hoveredLink="/api/media/file/Singer-Transparent.png"
					unhoveredLink="/api/media/file/Singer-Transparent.png"
					profileLink="/api/media/file/Singer.jpg"
					name="Kelsey Finn"
				>
					Kelsey is the lead singer and lyricist of Stage Fright.
					After discovering her love of singing at a young age, Kelsey
					explored music through all avenues including choir and
					theathre; however, she has found her home on the stage with
					Stage Fright. Her incredible vocals bring life and strength
					the band&apos;s message and artistry.
				</MemberHighlight>
				<MemberHighlight
					hoveredLink="/api/media/file/Drummer-transparent.png"
					unhoveredLink="/api/media/file/Drummer-transparent.png"
					profileLink="/api/media/file/Drummer.jpg"
					name="Keith Nelson"
				>
					Keith is the steady beat that keeps the band going. He first
					fell in love with the drums after joining his high school
					band, and he hasn&apos;t looked back sense. His strong
					rhythmic presence gives the band&apos;s music supreme depth!
				</MemberHighlight>
				<MemberHighlight
					hoveredLink="/api/media/file/Bassist-transparent.png"
					unhoveredLink="/api/media/file/Bassist-transparent.png"
					profileLink="/api/media/file/Bassist.jpg"
					name="Ethan Lewis"
				>
					Ethan provides the basis for a beautiful rhythm section for
					the band with his incredible skills on the bass guitar.
					Ethan has always been a performer and storyteller, and he
					brings that same captivating creativity to the band.
				</MemberHighlight>
				<MemberHighlight
					hoveredLink="/api/media/file/Guitarist-transparent.png"
					unhoveredLink="/api/media/file/Guitarist-transparent.png"
					profileLink="/api/media/file/Guitarist.jpg"
					name="Ryan Oleson"
				>
					Ryan brings energy and miraculous melody to the band&apos;s
					presence as its lead guitar player. He has always had a love
					for expressing ideas through music that reach many different
					types of people. He is honored to share his music with the
					band and their audience.
				</MemberHighlight>
			</div>
		</>
	);
}
